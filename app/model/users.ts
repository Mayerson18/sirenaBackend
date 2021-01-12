import mongoose from 'mongoose';

export type UsersDocument = mongoose.Document & {
  firstName: string,
  lastName: string,
  password: string,
  description: string,
  createdAt: Date,
};

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Note: OverwriteModelError: Cannot overwrite `Users` model once compiled. error
export const users = (mongoose.models.users ||
mongoose.model<UsersDocument>('users', usersSchema, process.env.DB_USERS_COLLECTION)
);