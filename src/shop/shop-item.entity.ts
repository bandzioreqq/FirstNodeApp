import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import {ShopSet} from "src/shop/shop-set.entity";
import {ShopItemDetails} from "src/shop/shop-item-details.entity";

@Entity()
export class ShopItem extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        length: 60,
    })
    name:string;
    @Column({
        type: 'text',
        default: '(brak)',
        nullable: true,
    })
    description:string | null;
    @Column({
        type: 'float',
        precision: 6,
        scale: 2,

    })
    price:number;

    @Column({
        default: ()=> 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        default: 0,
    })
    boughtCounter: number;

    @Column({
        default: false,
    })
    wasEverBought: boolean;

    /*Subprodukt*/
    @ManyToOne(type => ShopItem, entity => entity.subShopItem)
    mainShopItem: ShopItem;
    /*Produkt główny*/
    @OneToMany(type => ShopItem,entity=>entity.mainShopItem)
    subShopItem: ShopItem[];

    @ManyToMany(type => ShopSet, entity=>entity.items)
    @JoinTable()
    sets: ShopSet[];

    @OneToOne(type=> ShopItemDetails)
    @JoinColumn()
    details: ShopItemDetails;

}