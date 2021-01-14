
import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

import { users, mails } from './model';
import { UsersController } from './controller/users';
import { AuthController } from './controller/auth';
import { MailsController } from './controller/mails';
import { FiltersController } from './controller/filters';
import { auth } from './auth/verifyToken';
import { filters } from './model/filters';
const usersController = new UsersController(users);
const authController = new AuthController(users);
const mailsController = new MailsController(mails);
const filtersController = new FiltersController(filters);

export const create: Handler = (event: any) => {
  return authController.register(event);
};

export const update: Handler = (event: any) => usersController.update(event);

export const find: Handler = () => usersController.find();
1
export const findOne: Handler = (event: any, context: Context) => {
  return usersController.findOne(event, context);
};

export const deleteOne: Handler = (event: any) => usersController.deleteOne(event);

export const findMails: Handler = () => mailsController.find();

export const filterMailsByMessageOrSubject: Handler = (event: any, context: Context) => {
  return mailsController.filter(event, context);
};

export const verifyToken: Handler = (event: any, context: Context, callback: any) => {
  return auth(event, context, callback);
};

export const login: Handler = (event: any) => {
  return authController.login(event);
};

export const createFilter: Handler = (event: any) => {
  return filtersController.create(event);
};

export const findFilter: Handler = (event: any) => {
  return filtersController.findFilter(event);
};
