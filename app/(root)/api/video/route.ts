import { authOptions } from "@/lib/auth";
import { ConnTODB } from "@/lib/DB";
import Video from "@/models/Video";
import { IKVideoProps } from "@imagekit/next";
import { error } from "console";
import { request } from "http";
import { Session } from "inspector/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET() {
    try {
       await ConnTODB()
       const videos= await Video.find({}).sort({createdAt:-1}).lean()
        if(!videos || videos.length ===0){
            return NextResponse.json(
                [],{status:200}
            )
        }

        return NextResponse.json(
            videos
        )
    } catch (error) {
        return NextResponse.json(
            {error:"fetech videos failed!"},
            {status:500}
        )
    }
    
}

export async function POST(request:NextRequest) {
    try {
       await getServerSession(authOptions)
       if(!Session){
        return NextResponse.json(
            {error:"unauthorizes to uplaod"},
            {status:401}
        )
       }
       await ConnTODB()
       const body:IKVideoProps = await request.json()
       if(!body.title || !body.urlEndpoint ||body.thumbnailUrl){
        return NextResponse.json(
            {error:"missing required fields"},{status:500}
        )
       }

       const videoData={...body,}
     const newVideo=  await Video.create(videoData);
     return NextResponse.json(
        newVideo
     )
    } catch (error) {
        return NextResponse.json(
            error,{status:500}
        )
        
    }
    
}