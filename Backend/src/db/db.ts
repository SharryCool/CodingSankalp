import mongoose from "mongoose";

const dbToConnect=async()=>{
    try {
     
        
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("Db is Connected Successfully");
        
    } catch (error) {
        

        console.log(error);
    }
}

export default dbToConnect;