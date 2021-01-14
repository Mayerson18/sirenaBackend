import { Model } from 'mongoose';
import { MessageUtil } from '../utils/message';
import { FilterService } from '../service/filters';
import { CreateFilterDTO } from '../model/dto/createFilter';

export class FiltersController extends FilterService {
  constructor (filters: Model<any>) {
    super(filters);
  }

  /**
   * Create filter
   * @param {*} event
   */
  async create (event: any) {
    const params: CreateFilterDTO = JSON.parse(event.body);
    const userId: string = event.requestContext.authorizer.principalId;
    try {
      const result = await this.create({
        filter: params.filter,
        user: userId
      });
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query find filters by userId
   * @param event
   */
  async findFilter (event: any) {
    try {
      const userId: string = event.requestContext.authorizer.principalId;
      const result = await this.findFiltersByUserId(userId);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }
}
