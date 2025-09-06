import { ConnTODB } from "@/lib/DB";
import User from "@/models/User";
import { error } from "console";
import { NextRequest,NextResponse } from "next/server";
import { json } from "stream/consumers";
export async function POST(request:NextRequest) {
    try {
        const {email,password}= await request.json()
        if(!(email && password)){
            return NextResponse.json(
                {error:"email and password is required!"},
                {status:400}
            )
        }

         await ConnTODB()
         const existingUser= await User.findOne({email})
         if(existingUser){
            return NextResponse.json(
                {error:"user already registered!"},
                {status:400}
            )
         }
         await User.create({
                email,
                password
            })
            
            return NextResponse.json(
                {message:"User Registered Successfully!"},
                {status:200}
            )
    } catch (error) {
        return NextResponse.json(
            {error:"failed to register user"},
            {status:400}
        )
    }
    
}