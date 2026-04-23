import "dotenv/config";
import dbToConnect from "./db/db.js";
import express from "express";
import cors from "cors";
dbToConnect();
import fs from "fs";
import path from "path";
import appRoute from './routes/adminRoute.js'
import blogRoute from './routes/blogRoute.js'
import contactRoute from './routes/contactRoute.js'
import courseDetailPageRoute from "./routes/courseDetailPageRoute.js";
import testimonialRoute from './routes/testimonialRoute.js'
import paymentRoute from "./routes/paymentRoute.js"
const app=express();
const PORT=process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/static",express.static(path.join(process.cwd(),"static")))

app.use("/api/admin",appRoute)
app.use("/api/blog",blogRoute)
app.use("/api/contact",contactRoute)
app.use("/api/testimonial", testimonialRoute);
app.use("/api/course-detail-page", courseDetailPageRoute);
app.use("/api/payment",paymentRoute)
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});