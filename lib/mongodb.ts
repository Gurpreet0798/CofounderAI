import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI= process.env.MONGODB_URI ;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  console.log("Db Connections: "+  MONGODB_URI);
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
