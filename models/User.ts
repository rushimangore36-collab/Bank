import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  accountNumber: string;
  password: string;
  balance: Number;
}

const UserSchema: Schema<IUser> = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
