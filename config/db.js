import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'my-diary-app',
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};


// import {connect} from 'mongoose';

// export const connectToDatabase = async () => {
//     connect(`${process.env.MONGODB_URI}`,{
//         dbName: 'my_diary_app',
//     }).then((conn)=>{
//         console.log(`Database connected successfully: ${conn.connection.host}`);
//     }).catch((err)=>{
//         console.error(`Database connection failed: ${err.message}`);
//     });
// }