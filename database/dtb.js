import mongoose from "mongoose";

export default async function connectDB() {
  const url = "mongodb://localhost:27017/booking-birthday";

  try {
    await mongoose.connect(url).then((data) => {
      console.log(`Database connect with ${data.connection.host}`);
    });
  } catch (err) {
    console.error(err.message);
    setTimeout(connectDB, 5000);
  }
}
