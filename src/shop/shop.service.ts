import {Injectable, Inject, forwardRef} from '@nestjs/common';
import {GetListOfProductsResponse, GetPaginatedListOfProductsResponse} from "../interfaces/shop";
import {BasketService} from "../basket/basket.service";
import {InjectRepository} from '@nestjs/typeorm';
import {ShopItem} from "./shop-item.entity";
import {Repository, LessThan, Between, Like, IsNull, In, Not,Raw} from 'typeorm';

@Injectable()
export class ShopService {

    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
        @InjectRepository(ShopItem) private ShopItem: Repository<ShopItem>
    ) {
    }

    async getProducts(): Promise<GetListOfProductsResponse> {
        // const count = await this.ShopItem.count();
        // console.log({count});
        return await this.ShopItem.find();
    }

    async getRightProducts(pageNumber: number =1 ): Promise<GetPaginatedListOfProductsResponse> {
        const maxOnPage = 5;


        const [items, count] = await this.ShopItem.findAndCount({
            skip: maxOnPage * (pageNumber - 1),
            take: maxOnPage,
        });
        const totalPages = Math.ceil(count / maxOnPage);
        // console.log({count, totalPages});
        return {
            items,
            totalPages,
        };
    }

    async hasProduct(name: string): Promise<boolean> {
        return (await this.getProducts()).some(item => item.name === name);
    }

    async getPriceOfProduct(name: string): Promise<number> {
        return (await this.getProducts()).find(item => item.name === name).price;
    }

    async getOneProduct(id: string): Promise<ShopItem> {
        return await this.ShopItem.findOneOrFail(id);
    }

    async removeProduct(id: string) {
        await this.ShopItem.delete(id);
    }

    async createNewProduct(): Promise<ShopItem> {
        const newItem = new ShopItem();
        newItem.name = 'Banan';
        newItem.price = 100;
        newItem.description = 'Lorem ipsum';

        await this.ShopItem.save(newItem);
        return newItem;
    }

    async addBoughtCounter(id: string) {
        await this.ShopItem.update(id, {
            wasEverBought: true,
        })
        const item = await this.ShopItem.findOneOrFail(id);
        item.boughtCounter++;
        await this.ShopItem.save(item);
    }

    async findItems(searchTerm: string): Promise<GetListOfProductsResponse> {
        return await this.ShopItem.find({
            //zwracanie wybranych pól
            // select:['id','price'],
          // sortowanie
          //   order: {
          //       price: 'ASC',
          //       createdAt: 'DESC'
          //   },
            // wyszukiwanie konkretnych po prostym porównaniu
            where: {
                // description: Like('%searchTerm%'),
                price: Not(Between(5,56)),

            }

        });
    }
}
