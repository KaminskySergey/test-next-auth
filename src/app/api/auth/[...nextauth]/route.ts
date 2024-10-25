import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { login } from "../../../../../actions/login";
 
interface ICredentials {
    email: string;
    password: string;
  }
  
  export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
        },
        async authorize(credentials: ICredentials | null | undefined) {
          if (!credentials) return null;
          const data = await login({
            email: credentials.email,
            password: credentials.password,
          });
          if (!data) return null;
          return data;
        },
      }),
    ],
    pages: {
      signIn: '/login',
    },
    session: { strategy: "jwt" },
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token }) {
        session.user = token as any;
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET
  };
  
  export const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };