import AppError from '@shared/errors/AppError';
import { IShowProduct } from '../domain/models/IShowProduct';
import { IProduct } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct | undefined> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 400);
    }

    return product;
  }
}
export default ShowProductService;
