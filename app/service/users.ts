import { Model } from 'mongoose';
import { CreateUserDTO } from '../model/dto/createUserDTO';

export class UsersService {
  private users: Model<any>;
  constructor(users: Model<any>) {
    this.users = users;
  }

  /**
   * Create user
   * @param params
   */
  protected async createUser (params: CreateUserDTO): Promise<object> {
    try {
      const result = await this.users.create({
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        password: params.password
      });

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Update a user by id
   * @param id
   * @param data
   */
  protected updateUsers (id: number, data: object) {
    return this.users.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true },
    );
  }

  /**
   * Find users
   */
  protected findUsers () {
    return this.users.find();
  }

  /**
   * Query user by id
   * @param id
   */
  protected findOneUserById (id: number) {
    return this.users.findOne({ id });
  }

  /**
   * Query user by email
   * @param email
   */
  protected findOneUserByEmail (email: string) {
    return this.users.findOne({ email });
  }

  /**
   * Delete user by id
   * @param id
   */
  protected deleteOneUserById (id: number) {
    return this.users.deleteOne({ id });
  }
}
