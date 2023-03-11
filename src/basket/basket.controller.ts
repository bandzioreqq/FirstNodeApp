import {Controller, Post, Body, Inject} from '@nestjs/common';
import {AddProductDto} from "./add-product.dto";
import {BasketService} from "./basket.service";
import {AddProductToBasketResponse} from "../interfaces/basket";

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
}
