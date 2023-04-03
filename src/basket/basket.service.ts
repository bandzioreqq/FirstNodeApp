import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import {
  AddProductToBasketResponse,
  GetTotalBasketPriceResponse,
  RemoveProductFromBasketResponse,
} from '../types';
import { ShopService } from '../shop/shop.service';
import { ItemInBasket } from './entities/item-in-basket.entity';

@Injectable({ scope: Scope.REQUEST })
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private readonly shopService: ShopService,
  ) {}

  async add(product: AddItemDto): Promise<AddProductToBasketResponse> {
    const { count, id } = product;

    const shopItem = await this.shopService.getOneItem(id);

    if (
      typeof id !== 'string' ||
      typeof count !== 'number' ||
      id === '' ||
      count < 1 ||
      !shopItem
    ) {
      return {
        isSuccess: false,
      };
    }
    const item = new ItemInBasket();

    item.count = count;
    await item.save();

    item.shopItem = shopItem;
    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(id: string): Promise<RemoveProductFromBasketResponse> {
    const item = await ItemInBasket.findOne({ where: { id } });
    if (item) {
      await item.remove();
      return {
        isSuccess: true,
      };
    }
    return { isSuccess: false };
  }

  async getAll(): Promise<ItemInBasket[]> {
    return ItemInBasket.find({
      relations: ['shopItem'],
    });
  }

  async clearBasket(): Promise<void> {
    await ItemInBasket.delete({});
  }

  async getTotalPrice(): Promise<GetTotalBasketPriceResponse> {
    const items = await this.getAll();

    return (
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
