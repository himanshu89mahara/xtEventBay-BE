import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import logger from "./utils/logger";
import userRoutes from "./user/user.routes";
import eventRoutes from "./events/event.routes";
import nominationRoutes from "./nominations/nomination.routes";

const app = express();
const PORT = process.env.PORT || 3200;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECT).then((res)=>{
    logger.log('info',`Mongoose connected`);
}).catch((err)=>{
    logger.log('error',`Mongoose not connected see Error: ${err.message}`);
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:'application/json'}));



app.use("/user",userRoutes);
app.use("/event",eventRoutes);
app.use("/nomination",nominationRoutes);


app.listen(PORT,()=>{
    console.log(`XTEventBay BE is running in ${PORT}`);
});