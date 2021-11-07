import { Injectable } from '@nestjs/common';
import { Product } from 'src/model/product.model';

@Injectable()
export class ProductsService {
  Product: Product[];

  insertProduct(title: string, desc: string, price: number) {
    const newProduct = new Product(new Date().toString(), title, desc, price);
    this.Product.push(newProduct);
  }

  getProduct(): Product[] {
    return this.Product;
    // const newProduct = Product();
    //  this.Product.push(newProduct);
  }
}
