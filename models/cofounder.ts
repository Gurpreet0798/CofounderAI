import mongoose from "mongoose";

export interface ICofounder extends mongoose.Document {
  name: string;
  age: number;
  email: string;
}

const cofounderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  inspiration: { type: String, required: true },
  personality: { type: String, required: true },
});

export default mongoose.models.Cofounder || mongoose.model<ICofounder>("Cofounder", cofounderSchema);