import { Injectable } from '@nestjs/common';
import {GetListOfProductsResponse} from "../interfaces/shop";

@Injectable()
export class ShopService {
    getProducts():GetListOfProductsResponse {
        return [
            {
                name: 'Ogorek',
                description: 'Jest zielony.',
                price: 3,
            },
            {
                name: 'Pomidor',
                description: 'Jest czerwony.',
                price: 6,
            },
            {
                name: 'Cebula',
                description: 'Jest zolta.',
                price: 2,
            }
        ];
    }
    hasProduct(name:string):boolean{
        return this.getProducts().some(item => item.name === name );
    }
    getPriceOfProduct(name:string):number {
        return this.getProducts().find( item => item.name === name).price;
    }
}
