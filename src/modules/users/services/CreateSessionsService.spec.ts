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

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Robson Arruda',
      email: 'robson@email.com',
      password: 'teste123',
    });

    const response = await createSession.execute({
      email: 'robson@email.com',
      password: 'teste123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    // O usuário não está sendo criado, logo não existe esse usuário
    expect(
      createSession.execute({
        email: 'robson@email.com',
        password: 'teste123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Robson Arruda',
      email: 'robson@email.com',
      password: 'teste123',
    });

    expect(
      createSession.execute({
        email: 'robson@email.com',
        password: 'teste12345678910',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
