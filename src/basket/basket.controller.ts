import {Controller, Post, Body, Inject, Param, Delete, Get} from '@nestjs/common';
import {AddProductDto} from "./add-product.dto";
import {BasketService} from "./basket.service";
import {
    AddProductToBasketResponse, GetTotalPriceResponse,
    ListProductInBasketResponse,
    RemoveProductFromBasketResponse
} from "../interfaces/basket";

@Controller('basket')
export class BasketController {
    constructor(
        @Inject(BasketService) private basketService: BasketService,
    ) {
    }

    @Post('/')
    addProductToBasket(
        @Body() item: AddProductDto,
    ): AddProductToBasketResponse {
        return this.basketService.add(item);
    }

    @Delete('/:index')
    removeProductFromBasket(
        @Param('index') index: string,
    ): RemoveProductFromBasketResponse {
        return this.basketService.remove(Number(index));
    }
    @Get('/')
    listProductInBasket(): ListProductInBasketResponse{
return this.basketService.list();
    }
    @Get('/total-price')
    getTotalPrice(): GetTotalPriceResponse{
        return this.basketService.getTotalPrice();
    }
}
