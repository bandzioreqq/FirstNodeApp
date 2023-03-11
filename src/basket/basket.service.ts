import {Injectable, Inject} from '@nestjs/common';
import {AddProductDto} from './add-product.dto';
import {
    AddProductToBasketResponse, GetTotalPriceResponse,
    ListProductInBasketResponse,
    RemoveProductFromBasketResponse
} from "../interfaces/basket";
import {ShopService} from "../shop/shop.service";

@Injectable()
export class BasketService {
    private items: AddProductDto[] = [];

    constructor(
        @Inject(ShopService) private shopService: ShopService,
    ) {
    }

    add(item: AddProductDto): AddProductToBasketResponse {
        const {name, count} = item;
        if (
            typeof name !== 'string'
            ||
            typeof count !== 'number'
            ||
            name === ''
            ||
            count < 1
            ||
            !this.shopService.hasProduct(name)
        ) {
            return {
                isSuccess: false,
            };
        }


        this.items.push(item);
        return {
            isSuccess: true,
            index: this.items.length - 1,
        };
    }

    remove(index: number): RemoveProductFromBasketResponse {
        if (
            index < 0
            ||
            index >= this.items.length
        ) {
            return {
                isSuccess: false,
            };
        }
        this.items.splice(index, 1);

        return {
            isSuccess: true,
        }
    }

    list(): ListProductInBasketResponse {
        return this.items;
    }

    getTotalPrice():GetTotalPriceResponse {
        if (!this.items.every(item=> this.shopService.hasProduct(item.name))){
            return {
                isSuccess: false,
            };
        }
        return this.items
            .map(item => this.shopService.getPriceOfProduct(item.name) * item.count * 1.23)
            .reduce((prev,curr) => prev + curr, 0);
    }
}
