import authOptions from "@/utils/AuthOptions";
import LoginForm from "../components/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return <LoginForm />;
};

export default LoginPage;
