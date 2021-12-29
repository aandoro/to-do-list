import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { ItemDTO } from './dto/item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {

    constructor(private itemsService: ItemsService) { }

    @Get('/')
    async getAll(@Res() res) {
        const items = await this.itemsService.getItems()
        return res.status(HttpStatus.OK).json({
            items
        })
    }

    @Get('/:id')
    async getItem(@Res() res, @Param('id') id: string) {
        const item = await this.itemsService.getItem(id)
        if (!item)
            throw new NotFoundException("Item doesn't exists")
        return res.status(HttpStatus.OK).json({
            item
        })
    }

    @Post('/create')
    async create(@Res() res, @Body() itemDTO: ItemDTO) {
        const item = await this.itemsService.create(itemDTO)
        return res.status(HttpStatus.OK).json({
            message: "Item created success",
            item
        })
    }

    @Put('/:id')
    async update(@Res() Res, @Param('id') id: string, @Body() itemDTO: ItemDTO) {
        const item = await this.itemsService.update(id, itemDTO);
        if (!item)
            throw new NotFoundException("Item doesn't exists")
        return Res.status(HttpStatus.OK).json({ item })
    }

    @Delete('/:id')
    async delete(@Res() Res, @Param('id') id: string) {
        const item = await this.itemsService.delete(id)
        if (!item)
            throw new NotFoundException("Item doesn't exists")
        return Res.status(HttpStatus.OK).json({
            item
        })
    }
}
