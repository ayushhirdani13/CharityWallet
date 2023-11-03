// ./data/redisConnect.js
import { createClient } from 'redis';

export const redisClient = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

// Function to check if Redis is connected
export const isRedisConnected = async () => {
  try {
    await redisClient.ping();
    return true; // If ping is successful, Redis is connected
  } catch (error) {
    return false; // If an error occurs, Redis is not connected
  }
};