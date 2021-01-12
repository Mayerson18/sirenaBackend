import { Model } from 'mongoose';
// import { CreateMailDTO } from '../model/dto/createMailDto';

export class MailsService {
  private mails: Model<any>;
  constructor(mails: Model<any>) {
    this.mails = mails;
  }

  /**
   * Find mails
   */
  protected findMails () {
    return this.mails.find();
  }

  /**
   * Filter mail list by message or subject
   */
  protected filterByMessageOrSubject (filter: string) {
    return this.mails.find({
      $text: {
        $search: filter
      }
    });
  }
}
