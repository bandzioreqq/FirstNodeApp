export interface ShopItem{
    id:string;
    name:string;
    description:string;
    price:number;
}

export type GetListOfProductsResponse = ShopItem[];

export type GetOneProductResponse = ShopItem;

export type CreateNewProductResponse = ShopItem;

export interface GetPaginatedListOfProductsResponse{
    items: ShopItem[];
    totalPages: number;
}