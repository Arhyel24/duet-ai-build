import authOptions from "@/utils/AuthOptions";
import NextAuth from "next-auth";

//route

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
