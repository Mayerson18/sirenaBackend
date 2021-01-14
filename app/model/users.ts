import mongoose from 'mongoose';

export type UsersDocument = mongoose.Document & {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  createdAt: Date,
};

const usersSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  filters : [
    {type: mongoose.Schema.Types.ObjectId,ref:'Filters'}
  ]
});

// Note: OverwriteModelError: Cannot overwrite `Users` model once compiled. error
export const users = (mongoose.models.users ||
mongoose.model<UsersDocument>('users', usersSchema, process.env.DB_USERS_COLLECTION)
);