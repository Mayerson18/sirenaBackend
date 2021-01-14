import mongoose from 'mongoose';

export type FiltersDocument = mongoose.Document & {
  filter: string,
  createdAt: Date,
};

const filtersSchema = new mongoose.Schema({
  filter: String,
  createdAt: { type: Date, default: Date.now },
  user :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
  }
});

// Note: OverwriteModelError: Cannot overwrite `filters` model once compiled. error
export const filters = (mongoose.models.filters ||
mongoose.model<FiltersDocument>('filters', filtersSchema, process.env.DB_FILTERS_COLLECTION)
);