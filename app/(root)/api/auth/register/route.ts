import { ConnTODB } from "@/lib/DB";
import User from "@/models/User";

import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    try {
      const {email,password}= await request.json()
      if(!email ||!password){
        return NextResponse.json(
          {
            error: "email and password are requred",
          },
          {
            status: 400,
          }
        );
      }
      await ConnTODB();
      const exisedUser = await User.findOne({ email });
      if(exisedUser){
        return NextResponse.json(
            {
                error:"email already registered!"
            },
            {
                status:400
            }
        )
      }

   const user= await User.create(
        {
            email,
            password,
        }
      )
      // console.log(user);
      

      return NextResponse.json(
        {
            message:"user registered succesfully"
        },
        {
            status:201
        }
      )
        
    } catch (error) {
        return NextResponse.json(
          {
            error: "user registration  failed",
          },
          {
            status: 500,
          }
        );
    }
    
}