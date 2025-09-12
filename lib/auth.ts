import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { ConnTODB } from "./DB";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error("missing  email or password")
                }
                try {
                     await ConnTODB()
                    const user= await User.findOne({email:credentials.email})
                    if(!user){
                        throw new user("User not found")
                    }

                   const correctPassword= await bcrypt.compare(credentials.password,user.passsword)
                   if(!correctPassword){
                    throw new Error("incorrect Password")
                   }

                   return {
                    id:user._id.toString(),
                    email:user.email
                   }
                } catch (error) {
                    console.log("auth error",error);
                    throw error
                    
                }
                
            }
        })
    ],callbacks:{
         async jwt({ token, user }) {
     if(user){
        token.id =user.id
     }
     return token
    },
     async session({ session,  token }) {
      if(session.user){
        session.user.id=token.id as string
      }

      return session
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
   
   
    },
    pages:{
        signIn:"/login",
        error:"/login",
    
    },session:{
        strategy:"jwt",
        maxAge:30*24*60*60
    },
    secret:process.env.NEXTAUTH_SECRET!

};