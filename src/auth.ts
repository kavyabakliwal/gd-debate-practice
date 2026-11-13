import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import Google from "next-auth/providers/google";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    Google
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // Because When google is provider user.id = google id not user's
        if (account?.provider === "google"){
          const lookUser = await prisma.user.findUnique({
            where : {email : user.email?.toLowerCase()}
          })
          if (lookUser) token.id = lookUser?.id
          else console.error("User not found")
        }
        else token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({account,profile}){
      if (account?.provider === "google"){
        try {
        const userEmail = profile?.email?.toLowerCase()
        if (!profile?.email_verified || userEmail === undefined ) return "/login?error=unverified-email"
        const user = await prisma.user.findUnique({
          where : { email: userEmail }
        })

        if (!user){
          await prisma.user.create({
            data : {
              name : profile.name,
              email : userEmail
            }
          })
          return true
        }

        if (user){
          if (user.passwordHash !== null) return "/login?error=password-account"
        }
        return true
      }
      catch (e){
        console.error(e)
        return "/login?error=server-error"
      }
      }
      return true
    }
  },
  pages: {signIn: "/login", error: "/login"}
});