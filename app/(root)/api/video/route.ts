import { authOptions } from "@/lib/auth";
import { ConnTODB } from "@/lib/DB";
import Video from "@/models/Video";
import { IVideo } from "@/models/Video";


import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() 
{

    try {
        ConnTODB();
         const videos = await Video.find({}).sort({ createdAt: 1 }).lean()
         if(!videos){
            return Response.json(
                { error: "No video found" },
                { status: 404 }
            );
         }
         if(!videos || videos.length===0){
            return NextResponse.json(
               [],{status:200}
            )
         }
         console.log(videos);
         
         return NextResponse.json(
            videos
         )


    } catch (error) {
        console.log("error in video auth", error);
        return Response.json(
            { error: "Failed to get video authentication parameters" },
            { status: 500 }
        );
        
    }
}

export async function POST(request: NextRequest) {
    try {
        
       const session = await getServerSession(authOptions);
       console.log("session",session);
       
       if (!session) {
        return NextResponse.json(
            {
                error: "unauthorized to upload"
            },
            {
                status: 401
            }
        );
       }

       await ConnTODB();
    //    console.log("body json ", await request.json());
       
      const body: IVideo = await request.json();
    //   console.log("body", body);
      
      if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
        return NextResponse.json(
            {
                error: "missing required fields"
            },
            {
                status: 401
            }
        );
      }

      const videoData = {
        ...body
      };
      const NewVideo = await Video.create(videoData);
        return NextResponse.json(
            NewVideo,
            {
                status: 201
            }
        );


    } catch (error) {
        console.log("error in video auth", error);
        return NextResponse.json(
            { error: "Failed to create video " },
            { status: 500 }
        );
        
    }
}