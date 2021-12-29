import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Item } from "./interfaces/item.interface";
import { ItemDTO } from "./dto/item.dto";

@Injectable()
export class ItemsService {

    constructor(@InjectModel('Item') private itemModel: Model<Item>) { }

    async getItems(): Promise<Item[]> {
        return await this.itemModel.find()
    }

    async getItem(id: string): Promise<Item> {
        return await this.itemModel.findById(id)
    }

    async create(itemDTO: ItemDTO): Promise<Item> {
        const item = new this.itemModel(itemDTO)
        return await item.save()
    }

    async update(id: string, itemDTO: ItemDTO): Promise<Item> {
        return await this.itemModel.findByIdAndUpdate(id, itemDTO, { new: true })
    }

    async delete(id: string): Promise<Item> {
        return await this.itemModel.findByIdAndDelete(id)
    }
}
