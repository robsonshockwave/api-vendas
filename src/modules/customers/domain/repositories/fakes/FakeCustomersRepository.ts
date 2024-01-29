import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { v4 as uuidv4 } from 'uuid';

import { SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);

    return customer;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer || null;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const customers = this.customers.slice(skip, take);

    const result = {
      per_page: take,
      total: this.customers.length,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer || null;
  }

  public async remove(customer: Customer): Promise<void> {}

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer || null;
  }
}

export default FakeCustomersRepository;
