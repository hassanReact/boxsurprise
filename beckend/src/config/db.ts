import mongoose from 'mongoose';

let isConnected = false; // Global cache

const dbConnect = async () => {
  if (isConnected) {
    return; // Skip if already connected
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string);
    
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ MongoDB connected:', db.connection.host);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

export default dbConnect;
