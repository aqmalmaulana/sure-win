import { Model } from "mongoose";
import { ProductDto } from "../../dto/productDto";
import productModels, { IProduct } from "../../models/productModels";

export class ProductService {
    private product: Model<IProduct>

    constructor() {
        this.product = productModels
    }

    async create(data: ProductDto): Promise<ProductDto> {
        const clone = JSON.parse(JSON.stringify(data))
        clone._id= clone.id
        delete clone.id

        return await this.product.create(clone)
    }

    async findAll(): Promise<ProductDto[]> {
        return await this.product.find({
            deleteFlag: false
        })
    }

    async findProductById(id: string): Promise<ProductDto> {
        return await this.product.findOne({
            _id: id,
            deleteFlag: false
        })
    }

    async findProductsByCategory(category: string): Promise<ProductDto[]> {
        return await this.product.find({
            category,
            deleteFlag: false
        })
    }

    async updateProductById(data: ProductDto): Promise<ProductDto> {
        return await this.product.findOneAndUpdate({
            _id: data.id,
            deleteFlag: false
        }, data,
        {new: true})
    }

    async deleteProductById(id: string): Promise<ProductDto> {
        return await this.product.findByIdAndUpdate(id, {
            deleteFlag: true
        }, {new: true})
    }
}