import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class ShopItem{
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
}