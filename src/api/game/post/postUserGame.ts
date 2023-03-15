import Big from "big.js"
import { request, Request, Response } from "express"
import { Config } from "../../../config"
import { ErrorType, OrderStatuses, OrderType } from "../../../enum"
import { BusinessError } from "../../../helper/handleError"
import { UniqueGenerator } from "../../../helper/uniqueGenerator"
import { Validation, Validator } from "../../../helper/validator"
import { apiRouter } from "../../../interfaces"
import { CustomerService } from "../../../services/internal/customerService"
import { FundService } from "../../../services/internal/fundsService"
import { GameTypeService } from "../../../services/internal/gameTypeService"
import { OrderSerivce } from "../../../services/internal/orderService"
import { UserGameService } from "../../../services/internal/userGameService"

const path = "/v1/game/user"
const method = "POST"
const auth = "admin"

const bodyValidation: Validation[]= [
    {
        name: "cifId",
        type: "string",
        required: true
    },
    {
        name: "gameId",
        type: "string",
        required: true
    },
    {
        name: "productId",
        type: "string",
        required: true,
    },
    {
        name: "amount",
        type: "string",
        required: true
    },
    {
        name: "currency",
        type: "string",
        required: false,
        default: "trx"
    }
]
const main = async(req: Request, res: Response) => {
    const requestBody: {
        cifId: string,
        gameId: string,
        productId: string,
        amount: string,
        currency: string
    } = new Validator(req, res).process(bodyValidation, "body")
    if(!requestBody) {
        return;
    }

    const config = new Config()
    if(parseFloat(requestBody.amount) < config.minSpent) {
        throw new BusinessError("The funds you have spent are below the minimum limit", ErrorType.Validation)
    }   
    
    if(parseFloat(requestBody.amount) > config.maxSpent) {
        throw new BusinessError("The funds you have spent exceed the maximum limit", ErrorType.Validation)
    }

    const customerService = new CustomerService()
    const customer = await customerService.findById(requestBody.cifId)
    if(!customer) {
        throw new BusinessError("Customer not found", ErrorType.NotFound)
    }

    const fundService = new FundService()
    const fund = await fundService.findFundByCifId(customer.id)
    if(!fund) {
        throw new Error("Something wrong with your fund");
    }

    const fundBonus = new Big(fund.bonus)
    const fundBalance = new Big(fund.balance)
    const spentAmount = new Big(requestBody.amount)
    if(fundBonus.add(fundBalance).lt(spentAmount)) {
        throw new BusinessError("The funds you have are not sufficient", ErrorType.Validation)
    }

    const remaining = {
        bonus: new Big("0"),
        balance: new Big("0")
    }
    if(spentAmount.lte(fundBonus)) {
        remaining.bonus = remaining.bonus.minus(spentAmount)
        remaining.balance = fundBalance
    } else {
        const remain = fundBonus.minus(spentAmount)
        remaining.balance = fundBalance.add(remain)
    }

    const userGameService = new UserGameService()
    const createUserGame = await userGameService.create({
        cifId: customer.id,
        gameId: requestBody.gameId,
        productId: requestBody.gameId,
        spent: requestBody.amount,
        result: "PENDING"
    })

    const trxRefNo = await UniqueGenerator.invoice(customer, OrderType.PLAY)
    const orderService = new OrderSerivce()
    const createOrder = await orderService.create({
        cifId: customer.id,
        trxRefNo,
        description: `Spent amount for game`,
        priceAmount: requestBody.amount,
        priceCurrency: requestBody.currency,
        status: OrderStatuses.FINISHED,
        type: OrderType.PLAY,
        productId: requestBody.productId,
        gameId: requestBody.gameId,
        amount: requestBody.amount,
        payAmount: requestBody.amount,
        payCurrency: requestBody.currency,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    const updateFund = await fundService.update({
        cifId: customer.id,
        currency: requestBody.currency,
        balance: remaining.balance.toString(),
        bonus: remaining.bonus.toString(),
        updatedAt: new Date()
    })
    res.sendStatus(200)
}

const postUserGame: apiRouter = {
    path,
    method,
    main,
    auth
}

export default postUserGame