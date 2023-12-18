import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { fetchUser } from "./data";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session;
    },
    async jwt({ token, user }) {
      if (token.email) {
        const dbUser = await fetchUser(token.email);
  
        if (dbUser) {
          token.id = dbUser.id;
        } else if (user) {
          token.id = user.id;
        }
      }
      return token;
    },
  },
}