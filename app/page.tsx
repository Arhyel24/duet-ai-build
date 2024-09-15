import { getServerSession } from "next-auth";
import ChatPage from "./components/ChatPage";
import { redirect } from "next/navigation";
import authOptions from "@/utils/AuthOptions";

export default async function Base() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.email);

  if (!session) redirect("/login");

  return <ChatPage />;
}
