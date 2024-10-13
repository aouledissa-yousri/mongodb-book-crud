//ZXS7LLa6YFJbjFE1
const URL = "mongodb+srv://abczero:ZXS7LLa6YFJbjFE1@cluster0.m8v7w.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0"


import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};
