import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  profileImage?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: string;
  TIN?: string;
  department?: string;
}

const UserSchema: Schema = new Schema({
  profileImage: { type: String, default: '' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  role: { type: String, required: true },
  TIN: { type: String, default: '' },
  department: { type: String, required: false },
});

// Middleware to auto-populate sub-models
// UserSchema.pre(/^find/, function (next) {
//   const doc = this as mongoose.Query<any, any>;
//   doc
//     .populate('company')
//   next();
// });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;