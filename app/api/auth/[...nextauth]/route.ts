import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
import connectToDb from "@/utils/connectDatabase";
import { SessionStrategy } from "next-auth";
import User from "@/models/userModel";
import { verifyPassword } from "@/utils/argon";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    //   async profile(profile) {
    //     return {
    //       id: profile.sub,
    //       username: profile.sub,
    //       email: profile.email,
    //     };
    //   },
    //   httpOptions: {
    //     timeout: 10000,
    //   },
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connectToDb();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }
          const hashedpassword = user.password as string;
          const isPasswordValid = await verifyPassword(
            hashedpassword,
            password
          );

          if (!isPasswordValid) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error occurred in auth");
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 60 * 60,
    updateAge: 1 * 60,
  },
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl + "/userprofile";
  //   },
  // },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
