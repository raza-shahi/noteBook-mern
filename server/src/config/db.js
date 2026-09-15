import mangoose from "mongoose";

export const connectDB = async () => {
  try {
    await mangoose.connect(process.env.MONGO_URI);
    console.log("Connection to Databse successfull.");
  } catch (error) {
    console.log("Error connecting to MONGODB!", error);
  }
};
