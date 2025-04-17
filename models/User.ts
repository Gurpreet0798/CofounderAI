{/* import { Schema, model, models } from "mongoose"; 
interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
*/}

import { Schema, model, models } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  status?: string;
  lastLogin?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'User' },
  status: { type: String, default: 'Active' },
  lastLogin: { type: Date }
}, { timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;
