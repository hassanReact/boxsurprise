import mongoose from 'mongoose';

const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
    
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export default dbConnect;
