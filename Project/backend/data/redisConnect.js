// ./data/redisConnect.js

// Function to check if Redis is connected
export const isRedisConnected = async (redisClient) => {
  try {
    await redisClient.ping();
    console.log("Redis is Connected!"); // If ping is successful, Redis is connected
  } catch (error) {
    console.log("Redis is not Connected. Error: ", error) // If an error occurs, Redis is not connected
  }
}; 