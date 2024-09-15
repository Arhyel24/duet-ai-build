import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const authMiddleware =
  (handler: (arg0: NextApiRequest, arg1: NextApiResponse) => any) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
      return res
        .status(401)
        .json({ message: "You must be logged in to use this AI" });
    }

    return handler(req, res);
  };

export default authMiddleware;
