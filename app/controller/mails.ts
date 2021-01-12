import { Context } from 'aws-lambda';
import { Model } from 'mongoose';
import { MessageUtil } from '../utils/message';
import { MailsService } from '../service/mails';
// import { CreateMailDTO } from '../model/dto/createMailDto';

export class MailsController extends MailsService {
  constructor (mails: Model<any>) {
    super(mails);
  }

  /**
   * Find mail list
   */
  async find () {
    try {
      const result = await this.findMails();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query filter mails by message or subject
   * @param event
   */
  async filter (event: any, context: Context) {
    try {
      // The amount of memory allocated for the function
      console.log('memoryLimitInMB: ', context.memoryLimitInMB);
      const filter: string = String(event.pathParameters.filter);
      const result = await this.filterByMessageOrSubject(filter);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }
}
