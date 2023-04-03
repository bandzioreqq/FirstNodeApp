import {Injectable, Inject, forwardRef} from '@nestjs/common';
import {GetListOfProductsResponse, GetPaginatedListOfProductsResponse} from "../interfaces/shop";
import {BasketService} from "../basket/basket.service";
import {InjectRepository} from '@nestjs/typeorm';
import {ShopItem} from "./shop-item.entity";
import {Repository, LessThan, Between, Like, IsNull, In, Not, getConnection} from 'typeorm';
import {ShopItemDetails} from "src/shop/shop-item-details.entity";

@Injectable()
export class ShopService {

    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
        // @InjectRepository(ShopItem) private ShopItem: Repository<ShopItem>
    ) {
    }

    async getProducts(): Promise<GetListOfProductsResponse> {
        // const count = await this.ShopItem.count();
        // console.log({count});
        return await ShopItem.find({
            relations: ['details', 'sets'],
        });
    }

    async getRightProducts(pageNumber: number = 1): Promise<GetPaginatedListOfProductsResponse> {
        const maxOnPage = 5;


        const [items, count] = await ShopItem.findAndCount({
            relations: ['details'],
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
        return await ShopItem.findOneOrFail(id);
    }

    async removeProduct(id: string) {
        await ShopItem.delete(id);
    }

    async createNewProduct(): Promise<ShopItem> {
        const newItem = new ShopItem();
        newItem.name = 'Super ogórek';
        newItem.price = 150;
        newItem.description = 'bardzo zielony ogórek';

        await newItem.save();
        const details = new ShopItemDetails();
        details.color = 'green';
        details.width = 20;

        await details.save();
        newItem.details = details;
        //rozwiazanie relacji
        // newItem.details = null;
        await newItem.save();
        return newItem;
    }

    async addBoughtCounter(id: string) {
        await ShopItem.update(id, {
            wasEverBought: true,
        })
        const item = await ShopItem.findOneOrFail(id);
        item.boughtCounter++;
        await ShopItem.save(item);
    }

    async findItems(searchTerm: string): Promise<GetListOfProductsResponse> {
        return await ShopItem.find({
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
                price: Not(Between(5, 56)),

            }

        });
    }

    async findOrmItems(searchTerm: string):
        Promise<GetListOfProductsResponse> {
        const count = await getConnection()
            .createQueryBuilder()
            .select('COUNT(shopItem.id)', 'count')
            .from(ShopItem, 'shopItem')
            .getRawOne();

        console.log({count})
        return
        //
        // return await getConnection()
        //     .createQueryBuilder()
        //     .select('shopItem')
        //     .from(ShopItem, 'shopItem')
        //     .where('shopItem.description LIKE :searchTerm',{
        //         searchTerm: `%{searchTerm}%`,
        //     })
        //     .getMany();


}
}
