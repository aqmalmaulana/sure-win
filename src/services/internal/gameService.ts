import { Model } from "mongoose";
import { GameDto } from "../../dto/gameDto";
import gameModels, { IGame } from "../../models/gameModels";
import { v4 as uuid } from 'uuid';

export class GameService {
    private game: Model<IGame>

    constructor() {
        this.game = gameModels
    }

    async create(data: GameDto): Promise<IGame> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id = uuid()

        return await this.game.create(clone)
    }

    async createBulk(datas: GameDto[]): Promise<IGame[]> {
        const clone = JSON.parse(JSON.stringify(datas))
        for(const data of clone) {
            data._id = uuid()
        }

        return await this.game.insertMany(clone)
    }

    async updateBulk(datas: GameDto[]): Promise<void> {
        const bulkWriteOperations = []
        datas.forEach((data) => {
           bulkWriteOperations.push({
                updateOne: {
                    filter: {id: data.id},
                    update: data
                }
           })
        })

        await this.game.bulkWrite(bulkWriteOperations)
    }

    async findGameById(id: string): Promise<IGame> {
        return await this.game.findById(id)
    }

    async findGameByGameTypeId(gameTypeId: string): Promise<IGame[]> {
        return await this.game.find({
            gameTypeId
        })
    }

    async findLatestPeriodeByGameTypeIds(gameTypeIds: string[]): Promise<IGame[]> {
        return await this.game.aggregate([
            {$sort: {gameTypeId: 1, finishAt: -1}},
            { $group: { _id: "$gameTypeId", latestPeriode: { $first: "$periode" } } }
        ])
    }
}