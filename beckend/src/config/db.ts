import mongoose from 'mongoose';

const dbConnect = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }
  await mongoose.connect(process.env.MONGO_URI);
};

export default dbConnect;
