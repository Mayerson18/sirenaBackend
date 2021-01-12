import mongoose from 'mongoose';

export type MailsDocument = mongoose.Document & {
  firstName: string,
  lastName: string,
  email: string,
  id: number,
  message: string,
  subject: string,
  createdAt: Date,
};

const mailsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  id: { type: Number, index: true, unique: true },
  message: String,
  subject: String,
  createdAt: { type: Date, default: Date.now },
});

// Note: create filter index to message and subject
mailsSchema.index({message: 'text', subject: 'text'})

// Note: OverwriteModelError: Cannot overwrite `Mails` model once compiled. error
export const mails = (mongoose.models.mails ||
mongoose.model<MailsDocument>('mails', mailsSchema, process.env.DB_MAILS_COLLECTION)
);