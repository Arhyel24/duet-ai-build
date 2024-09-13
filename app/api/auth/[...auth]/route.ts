import { NextApiRequest, NextApiResponse } from "next";
import { login, register } from "@/utils/auth";
import connectToDb from "@/utils/connectDatabase";

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDb();
  if (req.method === "POST") {
    const authRoute = req.query.auth; // Get the dynamic part of the URL
    console.log("casted==========");

    if (authRoute === "login") {
      return login(req, res);
    } else if (authRoute === "register") {
      return register(req, res);
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
};

export { authHandler as POST };
