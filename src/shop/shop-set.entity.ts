import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import {ShopItem} from "src/shop/shop-item.entity";
@Entity()
export class ShopSet extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 50,

    })
    name:string;

    @ManyToMany(type=>ShopItem,entity=>entity.sets)
    items: ShopItem[];
}