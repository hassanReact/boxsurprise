import mongoose from "mongoose";


const dbConnect = async () => {
    mongoose.connection.on('connected', () => console.log('DataBase is Connected') )
   await mongoose.connect(process.env.MONGO_URI as string) 
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.log('Failed to connect to MongoDB', err));
} 

export default dbConnect