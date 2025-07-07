import mongoose from "mongoose";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn:null, promise:null}
}

async function connectDB(){

    if (cached.conn){
        return cached.conn;
    }

    if (!cached.promise){
        const opts = {
            bufferCommands:false
        }

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/QuickCart E-commerce`,opts).then(mongoose => {
            return mongoose
        })
    }


    cached.conn = cached.promise
    return cached.conn

}

export default connectDB