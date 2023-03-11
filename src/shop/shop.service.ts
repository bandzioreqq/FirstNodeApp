import { Injectable } from '@nestjs/common';
import {GetListOfProductsResponse} from "../interfaces/shop";

@Injectable()
export class ShopService {
    getProducts():GetListOfProductsResponse {
        return [
            {
                name: 'Hujek',
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
}
