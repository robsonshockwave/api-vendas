import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    console.log(customer, 'asasasas');

    if (!customer) {
      throw new Error('Customer not found.');
    }

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists && email !== customer.email) {
      throw new Error('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
