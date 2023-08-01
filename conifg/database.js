import mongoose from "mongoose";

const connectDB = async () => {
    try {
      await mongoose.connect(
        process.env.MONGO_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: "Chit-Chat",
        }
      );
      console.log("Database is connected");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export default connectDB; 