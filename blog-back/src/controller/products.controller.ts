import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from 'src/service/product.sercvice';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('insert')
  addProduct(
    @Body('title') proTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPpice: number,
  ): any {
    this.productService.insertProduct(proTitle, proDesc, proPpice);
  }

  @Get('getAll')
  getProducts(): any {
    const products = this.productService.getProduct();
    products.push({
      id: '1',
      title: 'title',
      description: 'desc',
      price: 89.5,
    });
    return 'products';
  }
}
