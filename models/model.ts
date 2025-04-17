import { Schema, model, models, Document } from "mongoose";

// User Model
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Manager' | 'User';
  status: 'Active' | 'Suspended';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'User'],
    default: 'User'
  },
  status: {
    type: String,
    enum: ['Active', 'Suspended'],
    default: 'Active'
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

export const User = models.User || model<IUser>("User", UserSchema);

// System Log Model
export interface ISystemLog extends Document {
  type: 'User' | 'System' | 'Database' | 'Security';
  action: string;
  details: string;
  timestamp: Date;
  userId?: string;
}

const SystemLogSchema = new Schema<ISystemLog>({
  type: {
    type: String,
    enum: ['User', 'System', 'Database', 'Security'],
    required: true
  },
  action: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String
  }
}, {
  timestamps: true
});

export const SystemLog = models.SystemLog || model<ISystemLog>("SystemLog", SystemLogSchema);

// Metrics Model
export interface IUserMetrics extends Document {
  date: Date;
  activeUsers: number;
  newUsers: number;
  deletedUsers: number;
}

const UserMetricsSchema = new Schema<IUserMetrics>({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  activeUsers: {
    type: Number,
    default: 0
  },
  newUsers: {
    type: Number,
    default: 0
  },
  deletedUsers: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const UserMetrics = models.UserMetrics || model<IUserMetrics>("UserMetrics", UserMetricsSchema);
