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

    async findGameById(id: string): Promise<IGame> {
        return this.game.findById(id)
    }

    async findGameByGameTypeId(gameTypeId: string): Promise<IGame[]> {
        return this.game.find({
            gameTypeId
        })
    }

}