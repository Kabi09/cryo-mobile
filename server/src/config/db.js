import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    if (env.nodeEnv === 'production') {
      process.exit(1);
    }
    throw error;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('[Database] MongoDB disconnected cleanly');
  } catch (error) {
    console.error(`[Database Error] Disconnect error: ${error.message}`);
  }
}
