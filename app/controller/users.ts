import { Context } from 'aws-lambda';
import { Model } from 'mongoose';
import { MessageUtil } from '../utils/message';
import { UsersService } from '../service/users';
import { CreateUserDTO } from '../model/dto/createUserDTO';

export class UsersController extends UsersService {
  constructor (users: Model<any>) {
    super(users);
  }

  /**
   * Create user
   * @param {*} event
   */
  async create (event: any, context?: Context) {
    console.log('functionName', context.functionName);
    const params: CreateUserDTO = JSON.parse(event.body);

    try {
      const result = await this.createUser({
        firstName: params.firstName,
        lastName: params.lastName,
        password: params.password
      });

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update a user by id
   * @param event
   */
  async update (event: any) {
    const id: number = Number(event.pathParameters.id);
    const body: object = JSON.parse(event.body);

    try {
      const result = await this.updateUsers(id, body);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find user list
   */
  async find () {
    try {
      const result = await this.findUsers();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query user by id
   * @param event
   */
  async findOne (event: any, context: Context) {
    // The amount of memory allocated for the function
    console.log('memoryLimitInMB: ', context.memoryLimitInMB);

    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOneUserById(id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete user by id
   * @param event
   */
  async deleteOne (event: any) {
    const id: number = event.pathParameters.id;

    try {
      const result = await this.deleteOneUserById(id);

      if (result.deletedCount === 0) {
        return MessageUtil.error(1010, 'The data was not found! May have been deleted!');
      }

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
