import mongoose from "mongoose"

export const connectDb=async()=>{
    try {
        
        mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log('succesfully connected to mngodb')
        })
    } catch (error) {
        console.log(error)
    }


};