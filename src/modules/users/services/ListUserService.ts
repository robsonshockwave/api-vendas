import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.find();

    return users;
  }
}

export default ListUserService;
