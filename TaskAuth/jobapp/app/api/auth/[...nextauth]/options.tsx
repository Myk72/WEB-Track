import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import { useLoginMutation } from "@/app/service/dummyData";


export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials :{
                email:{
                    label: "Email" ,type: "email",
                },
                password:{ label :"Password" ,type :"password"}
                
            },
            authorize: async (credentials) => {
                const email = credentials?.email as string | undefined;
                const password = credentials?.password as string | undefined;
                try {
                    const [loginMutation, { data, isError, isLoading }] = useLoginMutation();
                  
                    if (isLoading) {
                      return <div>Loading...</div>;
                    }
                  
                    const logInData = await loginMutation({ email, password });
                  
                    if (logInData.data) {
                      console.log(logInData.data);
                      return logInData.data;
                    } else {
                      return <h1>Error</h1>;
                    }
                  } catch (error) {
                    return <h1>Error</h1>;
                  }
                },
              
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages:{
        signIn: "/auth/LoginPage"
    },

    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
          if (token?.sub && token?.role) {
            session.user.id = token.sub;
            session.user.role = token.role;
          }
          return session;
        },
    
        async jwt({ token, user }: { token: any; user: any }) {
          if (user) {
            token.role = user.role;
          }
          return token;
        },
      },

}


