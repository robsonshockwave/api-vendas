import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 400);
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}
export default DeleteProductService;
