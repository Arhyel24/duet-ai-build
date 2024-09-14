import SignUp from "../components/signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const SigupPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return <SignUp />;
};

export default SigupPage;
