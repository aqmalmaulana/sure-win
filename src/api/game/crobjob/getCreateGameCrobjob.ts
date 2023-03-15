import Big from "big.js"
import { Request, Response } from "express"
import { FundsDto } from "../../../dto/fundsDto"
import { GameDto } from "../../../dto/gameDto"
import { GameTypeDto } from "../../../dto/gameTypeDto"
import { OrderDto } from "../../../dto/orderDto"
import { ProductDto } from "../../../dto/productDto"
import { UserGameDto } from "../../../dto/userGameDto"
import { OrderStatuses, OrderType } from "../../../enum"
import { Validation, Validator } from "../../../helper/validator"
import { apiRouter } from "../../../interfaces"
import RedisService from "../../../services/external/externalRedisService"
import { FundService } from "../../../services/internal/fundsService"
import { GameService } from "../../../services/internal/gameService"
import { GameTypeService } from "../../../services/internal/gameTypeService"
import { OrderSerivce } from "../../../services/internal/orderService"
import { ProductService } from "../../../services/internal/productService"
import { UserGameService } from "../../../services/internal/userGameService"

const path = "/v1/cronjob/get-new-game"
const method = "GET"
const auth = "cronjob"

const bodyValidation: Validation[]= []
const main = async(req: Request, res: Response) => {
    const gameService = new GameService()
    const gameTypeService = new GameTypeService()
    const redisService = new RedisService()
    const productService = new ProductService()
    const userGameService = new UserGameService()
    const orderService = new OrderSerivce()
    const fundService = new FundService()

    const gameTypes = await gameTypeService.findAll()
    const collectGameTypeIds = gameTypes.map((gameType) => gameType.id)

    let lastGames: GameDto[]

    const cached: GameDto[] = await redisService.getJson("games")
    if(cached) {
        lastGames = cached
    } else {
        lastGames = await gameService.findLatestPeriodeByGameTypeIds(collectGameTypeIds)
    }

    const now = new Date()
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0, 0)
    if(!lastGames) {
        let datas: GameDto[]
        for(const gameType of gameTypes) {
            const newGame: GameDto = {
                periode : "1",
                gameTypeId: gameType.id,
                result: {
                    color: "",
                    shape: "",
                    number: "",
                },
                winner: 0,
                looser: 0,
                startAt: new Date(),
                finishAt: new Date(currentDate.setMinutes(currentDate.getMinutes() + gameType.loop)),
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            datas.push(newGame)
        }

        const saveBulk = await gameService.createBulk(datas)
        const insertRedis = await redisService.setJson("games", saveBulk)

        return res.status(200).send(saveBulk)
    }

    const currentGames = lastGames.map((game) => {
        const gameType: GameTypeDto = gameTypes.find((type) => type.id === game.gameTypeId)
        return {
            ...game,
            gameType
        }
    })

    const newDataGame = []
    const shouldUpdated: {
        gameType: GameTypeDto;
        id?: string;
        periode?: string;
        gameTypeId: string;
        result?: {
            color: string;
            shape: string;
            number: string;
        };
        winner?: number;
        looser?: number;
        startAt: Date;
        finishAt: Date;
        createdAt?: Date;
        updatedAt?: Date;
        }[] = []
    const exitingGame = []
    for(const currentGame of currentGames) {
        const finishGame = new Date(currentGame.finishAt)
        const different = (currentDate.getTime() - finishGame.getTime()) / 60000
        if(different >= currentGame.gameType.loop) {
            const periode = parseInt(currentGame.periode) + 1
            const newGame: GameDto = {
                periode : periode.toString(),
                gameTypeId: currentGame.gameTypeId,
                result: {
                    color: "",
                    shape: "",
                    number: "",
                },
                winner: 0,
                looser: 0,
                startAt: new Date(),
                finishAt: new Date(currentDate.setMinutes(currentDate.getMinutes() + currentGame.gameType.loop)),
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            newDataGame.push(newGame)
            shouldUpdated.push(currentGame)
        } else {
            exitingGame.push(currentGame)
        }

        const bulkNewGame = await gameService.createBulk(newDataGame)
        exitingGame.push(newDataGame)

        await redisService.setJson("games", exitingGame)
    }

    const products = await productService.findAllProducts()
    if(shouldUpdated.length !== 0) {
        const collectGameIds = shouldUpdated.map(game => game.id)
        const usersGame = await userGameService.findUserGameByGameIds(collectGameIds)

        let groupedByGameTypeId = {}
        for(const product of products) {
            if(!groupedByGameTypeId[product.gameTypeId]) {
                groupedByGameTypeId[product.gameTypeId] = {}
            }
        
            if(!groupedByGameTypeId[product.gameTypeId][product.category]) {
                groupedByGameTypeId[product.gameTypeId][product.category] = {}
            }
        
            if(!groupedByGameTypeId[product.gameTypeId].totalUsers) {
                groupedByGameTypeId[product.gameTypeId].totalUsers = 0
            }
        
            if(!groupedByGameTypeId[product.gameTypeId][product.category][product.id]) {
                groupedByGameTypeId[product.gameTypeId][product.category][product.id] = {
                    users: 0,
                    totalSpents: new Big("0")
                }
            }
        }

        for(const userGame of usersGame) {
            const product = products.find(prod => prod.id === userGame.productId)
          
            groupedByGameTypeId[product.gameTypeId].totalUsers++
            groupedByGameTypeId[product.gameTypeId][product.category][product.id].users++
            groupedByGameTypeId[product.gameTypeId][product.category][product.id].totalSpents = groupedByGameTypeId[product.gameTypeId][product.category][product.id].totalSpents.add(new Big(userGame.spent))
        }

        let filteredWinner = {}
        let winnerProductId = []
        for(const gameTypeId in groupedByGameTypeId) {
            if(!filteredWinner[gameTypeId]) {
                filteredWinner[gameTypeId] = {
                    result: {
                        totalWinner: 0,
                        totalLooser: 0,
                        totalUsers: 0
                    }
                }
            }  
            let totalWinner = 0
            for(const category in groupedByGameTypeId[gameTypeId]) {
                if(category !== "totalUsers") {
                    for(const productId in groupedByGameTypeId[gameTypeId][category]) {
                        const {totalSpents, users} = groupedByGameTypeId[gameTypeId][category][productId]
                        if(totalSpents.gt(new Big("0"))) {
                            if(!filteredWinner[gameTypeId][category]) {
                                filteredWinner[gameTypeId][category] = {
                                    productId: productId,
                                    totalSpents: totalSpents,
                                    totalWinnerByCategory: users,
                                }
                            
                                continue;
                            }

                            if(totalSpents.lt(filteredWinner[gameTypeId][category].totalSpents)) {
                                filteredWinner[gameTypeId][category].totalSpents = totalSpents
                                filteredWinner[gameTypeId][category].productId = productId
                            }
                        }
                    }
                
                    const getProducts = products.filter(product => {
                        return product.category === category && product.gameTypeId === gameTypeId
                    })
                    const randomIndex = Math.floor(Math.random() * getProducts.length) + 1;
                    if (!filteredWinner[gameTypeId][category]) {
                        filteredWinner[gameTypeId][category] = {
                            productId: getProducts[randomIndex - 1].id,
                            totalSpents: new Big("0"),
                            totalWinnerByCategory: 0,
                        }
                    }
                
                    totalWinner += filteredWinner[gameTypeId][category].totalWinnerByCategory
                    winnerProductId.push(filteredWinner[gameTypeId][category].productId)
                }
            }
        
            filteredWinner[gameTypeId].result.totalWinner = totalWinner
            filteredWinner[gameTypeId].result.totalUsers = groupedByGameTypeId[gameTypeId]["totalUsers"]
            filteredWinner[gameTypeId].result.totalLooser = groupedByGameTypeId[gameTypeId]["totalUsers"] - totalWinner
        }

        const updatedGame: any = shouldUpdated.map(game => {
            return {
                id: game.id,
                periode: game.periode,
                gameTypeId: game.gameTypeId,
                result: {
                    color: filteredWinner[game.gameTypeId]["color"].productId,
                    number: filteredWinner[game.gameTypeId]["number"].productId,
                    shape: filteredWinner[game.gameTypeId]["shape"].productId,
                },
                winner: filteredWinner[game.gameTypeId].result.totalWinner,
                looser: filteredWinner[game.gameTypeId].result.totalWinner,
                updatedAt: new Date(),
            }
        })
        await gameService.updateBulk(updatedGame)

        const createOrderBulk: OrderDto[] = []
        const updatedUserGame: any = usersGame.map((userGame) => {
            if(winnerProductId.includes(userGame.productId)) {
                userGame.result = "WIN"
            } else {
                userGame.result = "LOSS"
            }

            const createOrder: OrderDto = {
                cifId: userGame.cifId,
                description: "Playing game",
                priceAmount: userGame.spent,
                priceCurrency: "trx",
                status: OrderStatuses.FINISHED,
                type: OrderType[userGame.result],
                productId: userGame.productId,
                gameId: userGame.gameId,
                amount: userGame.spent,
                payAmount: userGame.spent,
                payCurrency: "trx",
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            createOrderBulk.push(createOrder)

            return userGame
        })
        await userGameService.updateBulk(updatedUserGame)
        await orderService.createBulk(createOrderBulk)

        const collectCifId = usersGame.map((userGame) => userGame.cifId)
        const userFunds = await fundService.findFundByCifIds(collectCifId)
        const updatedUserFund: FundsDto[] = userFunds.map(userFund => {
            const userGameFiltered = updatedUserGame.filter(userGame => userGame.cifId === userFund.cifId)
            userGameFiltered.map(userGameFilter => {
                if(userGameFilter.result === "WIN") {
                    userFund.balance = new Big(userFund.balance).add(userGameFilter.spent).toString()
                } else {
                    userFund.balance = new Big(userFund.balance).minus(userGameFilter.spent).toString()
                }

                userFund.updatedAt = new Date()
            })

            return userFund
        })

        await fundService.updateBulk(updatedUserFund)
    }

    res.sendStatus(200)
}

const getCronjobNewGame: apiRouter = {
    path,
    method,
    main,
    auth
}

export default getCronjobNewGame