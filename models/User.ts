import bcrypt from "bcryptjs";
import mongoose,{Schema,model,models} from "mongoose";

declare interface IUser {
  password: string;
  email: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

const UserSchema=new Schema<IUser>(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,

        },
        image:{
            type:String,

        },

    },
    {
        timestamps:true
    }
)
UserSchema.pre("save",async function (next) {
    if(this.isModified("password")){
      this.password=await bcrypt.hash( this.password,10)
    }
    next();
})


const User=models?.User || model<IUser>("User",UserSchema)
export default User