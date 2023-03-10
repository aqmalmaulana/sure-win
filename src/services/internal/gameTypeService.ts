import { Model } from "mongoose";
import { ProductDto } from "../../dto/productDto";
import gameTypeModels, { IGameType } from "../../models/gameTypeModels";
import { v4 as uuid } from 'uuid';

export class GameTypeService {
    private gameType: Model<IGameType>

    constructor() {
        this.gameType = gameTypeModels
    }

    async create(data: ProductDto): Promise<IGameType> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id = uuid()

        return await this.gameType.create(clone)
    }

    async findGameTypeById(id: string): Promise<IGameType> {
        return this.gameType.findById(id)
    }

    async findGameTypeByCd(cd: string): Promise<IGameType> {
        return this.gameType.findOne({
            cd
        })
    }

}