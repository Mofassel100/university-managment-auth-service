import mongoose
  from "mongoose";
import app from "./app";
import config from "./config";
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
    console.log(`database connected`)
  } catch (err) {
    console.log(`failt to connect database`, err)
  }
}
boostrap();