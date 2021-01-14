import { Model } from 'mongoose';
import { MessageUtil } from '../utils/message';
import { UsersService } from '../service/users';
import {sign} from 'jsonwebtoken';
import {compare, hash, genSalt} from 'bcrypt';
import {promisify} from 'util';
import * as isemail from 'isemail';
import { CreateUserDTO } from '../model/dto/createUserDTO';

const signAsync = promisify(sign);

export class AuthController extends UsersService {
  constructor (users: Model<any>) {
    super(users);
  }
  
  async login (event) {
    const params: CreateUserDTO = JSON.parse(event.body);
    const {password} = params;
    try {
      const user = await this.findOneUserByEmail(params.email);
      console.log('user', user)
      if (!user) {
        return MessageUtil.error(401, 'Unauthorized');
      }
      const comparePass = await this.comparePassword(password, user.password);
      if (!comparePass) {
        return MessageUtil.error(401, 'Unauthorized');
      }
      const token = await this.generateToken(user);
      return MessageUtil.success({token});
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  };

  async register (event) {
    const user: CreateUserDTO = JSON.parse(event.body);
    try {
      const hashPass = await this.hashPassword(user.password);
      const result = this.createUser({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: hashPass
      });
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  };

  protected async validateCredentials(credentials: any) {
    
    if (!isemail.validate(credentials.email)) {
      return {statusCode: 412, message: 'invalid email'};
    }

    if (credentials.password.length < 4) {
      return {statusCode: 412, message: 'password must be of minimun 8 characthers length'};
    }

    const foundUser = await this.findOneUserByEmail(credentials.email);
    if (foundUser) {
      return {statusCode: 412, message: 'User exist'};
    }
  
    return {statusCode: 200};
  }

  protected async hashPassword(password: string) {
    const salt = await genSalt(12);
    return hash(password, salt);
  }
  
  protected comparePassword(providePass, storedPass) {
    return compare(providePass, storedPass);
  }

  protected async generateToken(user: any) {
    return signAsync({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    } , process.env.JWT_SECRET);
  }
}
