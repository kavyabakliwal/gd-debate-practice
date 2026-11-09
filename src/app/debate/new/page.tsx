
import { auth } from "@/auth";
import {redirect} from "next/navigation"
import DebateForm from "./DebateForm";



export default async function NewDebatePage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return <DebateForm/>

}
