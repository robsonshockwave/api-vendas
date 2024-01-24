import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 400);
    }

    return product;
  }
}
export default ShowProductService;
