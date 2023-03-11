import {AddProductDto} from "../basket/add-product.dto";

export type AddProductToBasketResponse = {
    isSuccess: true;
    index: number;
} | {
    isSuccess: false;
}

export interface RemoveProductFromBasketResponse{
    isSuccess: boolean;
}

export type ListProductInBasketResponse = AddProductDto[];

export type GetTotalPriceResponse = number | {
    isSuccess: false;
};