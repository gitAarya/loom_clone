"use client"
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next";
const UrlEndpoint= process.env.NEXT_PUBLIC_PUBLIC_KEY!
export default function Providers({children}:{children:React.ReactNode}){
    return(
        <SessionProvider refetchInterval={5*60}>
            <ImageKitProvider urlEndpoint={UrlEndpoint}>
        {children}
            </ImageKitProvider>
        </SessionProvider>
    )

}