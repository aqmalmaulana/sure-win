import { Model } from "mongoose";
import { v4 as uuid } from 'uuid';
import userGameModels, { IUserGame } from "../../models/userGameModels";
import { UserGameDto } from "../../dto/userGameDto";

export class UserGameService{
    private userGame: Model<IUserGame>;

    constructor() {
        this.userGame = userGameModels
    }

    async create(data: UserGameDto): Promise<IUserGame> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id = uuid()

        return await this.userGame.create(clone)
    }

    async updateBulk(datas: UserGameDto[]): Promise<void> {
        const bulkWriteOperations = []
        datas.forEach((data) => {
           bulkWriteOperations.push({
                updateOne: {
                    filter: {id: data.id},
                    update: data
                }
           })
        })

        await this.userGame.bulkWrite(bulkWriteOperations)
    }

    async findUsersByGameId(gameId: string): Promise<IUserGame[]> {
        return await this.userGame.find({
            gameId
        })
    }

    async findUsersByGameIdAndProductId(data: {gameId: string, productId: string}): Promise<IUserGame[]> {
        return await this.userGame.find({
            gameId: data.gameId,
            productId: data.productId
        })
    }

    async findUserGameByCifId(cifId: string): Promise<IUserGame[]> {
        return await this.userGame.find({
            cifId
        })
    }

    async findUserGameByGameIds(ids: string[]): Promise<IUserGame[]> {
        return await this.userGame.find({
            gameId: { $in: ids }
        })
    }
}