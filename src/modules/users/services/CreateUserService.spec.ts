import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Robson Arruda',
      email: 'robson@email.com',
      password: 'teste123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Robson Arruda',
      email: 'robson2@email.com',
      password: 'teste123',
    });

    expect(
      createUser.execute({
        name: 'Robson Arruda',
        email: 'robson2@email.com',
        password: 'teste123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
