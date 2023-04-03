import { Module, forwardRef } from "@nestjs/common";
import {ShopController} from "./shop.controller";
import {ShopService} from "./shop.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {ShopItem} from "./shop-item.entity";
import {BasketModule} from "../basket/basket.module";


@Module({
    imports:[
        TypeOrmModule.forFeature([ShopItem]),
        forwardRef(()=> BasketModule)
    ],
    controllers: [ShopController],
    providers: [ShopService],
    exports: [ShopService]
})
export class ShopModule{

}