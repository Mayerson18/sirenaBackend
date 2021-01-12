
import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

import { users, mails } from './model';
import { UsersController } from './controller/users';
import { MailsController } from './controller/mails';
const usersController = new UsersController(users);
const mailsController = new MailsController(mails);

export const create: Handler = (event: any, context: Context) => {
  return usersController.create(event, context);
};

export const update: Handler = (event: any) => usersController.update(event);

export const find: Handler = () => usersController.find();

export const findOne: Handler = (event: any, context: Context) => {
  return usersController.findOne(event, context);
};

export const deleteOne: Handler = (event: any) => usersController.deleteOne(event);

export const findMails: Handler = () => mailsController.find();

export const filterMailsByMessageOrSubject: Handler = (event: any, context: Context) => {
  return mailsController.filter(event, context);
};
