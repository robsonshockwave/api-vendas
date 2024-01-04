import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 400);
    }

    await productsRepository.remove(product);
  }
}
export default DeleteProductService;
