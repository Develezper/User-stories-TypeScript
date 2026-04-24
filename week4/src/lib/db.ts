import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseConnection: MongooseConnection | undefined;
}

const globalConnection = globalThis.mongooseConnection ?? {
  conn: null,
  promise: null,
};

if (!globalThis.mongooseConnection) {
  globalThis.mongooseConnection = globalConnection;
}

export async function connectToDatabase() {
  if (globalConnection.conn) {
    return globalConnection.conn;
  }

  if (!globalConnection.promise) {
    globalConnection.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });
  }

  try {
    globalConnection.conn = await globalConnection.promise;
  } catch (error) {
    globalConnection.promise = null;
    throw error;
  }

  return globalConnection.conn;
}

export function isDatabaseUnavailableError(error: unknown) {
  return (
    error instanceof Error &&
    (error.name === "MongooseServerSelectionError" ||
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("ServerSelection"))
  );
}