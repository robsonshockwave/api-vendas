import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Robson Arruda',
      email: 'robson@email.com',
      password: 'teste123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createSession.execute({
      name: 'Robson Arruda',
      email: 'robson2@email.com',
      password: 'teste123',
    });

    expect(
      createSession.execute({
        name: 'Robson Arruda',
        email: 'robson2@email.com',
        password: 'teste123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
