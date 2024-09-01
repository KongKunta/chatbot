import mongoose from "mongoose";

const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (connectionState === 2) {
    console.log("connecting to MongoDB");
    return;
  }

  try {
    mongoose.connect("mongodb://localhost:27017/", {
      dbName: "chat",
      bufferCommands: true,
    });
  } catch (error: any) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connect;
