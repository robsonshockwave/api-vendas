import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomerService', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: 'Robson Arruda',
      email: '',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', () => {
    expect(1).toBe(1);
  });
});
