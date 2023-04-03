import {Controller, Get, Inject, Param, Delete, Post} from '@nestjs/common';
import {
    CreateNewProductResponse,
    GetListOfProductsResponse,
    GetOneProductResponse,
    GetPaginatedListOfProductsResponse
} from "../interfaces/shop";
import {ShopService} from "./shop.service";

@Controller('shop')
export class ShopController {
    constructor(
        @Inject(ShopService) private shopService: ShopService,
    ) {
    }
    @Get('/')
    getMyShoppingList(): Promise<GetListOfProductsResponse> {
        return this.shopService.getProducts();
    }
    @Get('/right/:pageNumber')
    getMyRightShoppingList(
        @Param('pageNumber') pageNumber:string,
    ): Promise<GetPaginatedListOfProductsResponse> {
        return this.shopService.getRightProducts(Number(pageNumber));
    }
    @Get('/find/:searchTerm')
    testFindItem(
        @Param('searchTerm') searchTerm:string,
    ): Promise<GetListOfProductsResponse> {
        return this.shopService.findItems(searchTerm);
    }
    @Get('/:id')
    getOneProduct(
        @Param('id') id:string,
    ): Promise<GetOneProductResponse> {
        return this.shopService.getOneProduct(id);
    }
    @Delete('/:id')
    removeProduct(
        @Param('id') id:string,
    ) {
         this.shopService.removeProduct(id);
    }

    @Post('/')
    createNewProduct(
    ): Promise<CreateNewProductResponse> {
     return this.shopService.createNewProduct();
    }

}
