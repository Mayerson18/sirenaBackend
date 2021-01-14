import { Model } from 'mongoose';
import {CreateFilterDTO} from '../model/dto/createFilter'
export class FilterService {
  private filters: Model<any>;
  constructor(filters: Model<any>) {
    this.filters = filters;
  }

  /**
   * Find filters
   */
  protected findFiltersByUserId (userId: string) {
    return this.filters.findById(userId).populate('filters');
  }

  /**
   * create filter
   */
  protected async create (params: CreateFilterDTO): Promise<object> {
    try {
      const result = await this.filters.create({
        filter: params.filter,
        userId: params.userId
      });

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
