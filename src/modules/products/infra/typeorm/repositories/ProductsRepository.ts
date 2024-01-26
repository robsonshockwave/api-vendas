import { In, Repository } from 'typeorm';
import Product from '../entities/Product';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { dataSource } from '@shared/infra/typeorm';

export class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async create(data: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async findOne(id: string): Promise<Product | null> {
    const product = await this.ormRepository.findOneBy({
      id,
    });

    return product;
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.ormRepository.findOneBy({
      name,
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }
}
