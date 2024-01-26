import { Repository } from 'typeorm';
import User from '../entities/User';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { dataSource } from '@shared/infra/typeorm';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    return this.ormRepository.save(user);
  }

  public async find(): Promise<IUser[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByName(name: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({
      name,
    });

    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({
      id,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({
      email,
    });

    return user;
  }
}

export default UsersRepository;
