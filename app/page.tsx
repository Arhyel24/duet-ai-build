import { getServerSession } from "next-auth";
import ChatPage from "./components/ChatPage";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Base() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return <ChatPage />;
}
