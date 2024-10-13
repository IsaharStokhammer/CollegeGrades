import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://8526656:1WThE3gaYOUDeLta@cluster0.87rl3.mongodb.net/collegeTest?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`Mongo Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
  }
};

export default connectDB;