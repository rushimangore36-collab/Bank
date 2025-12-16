import mongoose, { Schema, Document, models } from "mongoose";

export interface IWithdraw extends Document {
  accountNumber: string;
  amount: number;
  createdAt: Date;
}

const WithdrawSchema = new Schema<IWithdraw>(
  {
    accountNumber: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Withdraw ||
  mongoose.model<IWithdraw>("Withdraw", WithdrawSchema);
