import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    // The method findOne is a method from the Repository class
    const product = await this.findOne({
      where: {
        name,
      },
    });

    return product;
  }
}
