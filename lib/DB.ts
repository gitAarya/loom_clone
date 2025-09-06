import mongoose from "mongoose";
 
const MONGODB_URI=process.env.MONGODB_URI!
if(!MONGODB_URI){
    throw new Error("mongoDb uri not defined")
}
let cached= global.mongoose

if(!cached){
   cached= global.mongoose={conn:null,promise:null}
}

export async function ConnTODB() {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        mongoose.connect(MONGODB_URI,{dbName:"SnapCast",bufferCommands:true,maxPoolSize:10})
        .then( ()=> mongoose.connection)
    }
    try {
    cached.conn  =  await cached.promise
    } catch (error) {
        cached.promise=null
        throw error
        
    }

    return cached.conn;
}

