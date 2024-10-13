import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://8526656:1WThE3gaYOUDeLta@cluster0.87rl3.mongodb.net/collegeTest?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected");
  } catch (error) {
    console.error(error);
  }
};


export default connectDb;