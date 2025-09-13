import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
export default withAuth(
    
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized( {req,token}){
        const {pathname}=req.nextUrl
        if(pathname.startsWith("/api/auth") || pathname ==="/sign-in" || pathname==="/register") return true;
        if(pathname==="/" || pathname.startsWith("/api/profile")) return true;
        return !!token;
      }
    },
  },)

export const config = {
    matcher: [ "/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}