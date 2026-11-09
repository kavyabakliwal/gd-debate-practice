export const maxDuration = 60

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import DebateWorkspace from "./DebateWorkspace";

type DebatePageProps = {
  params: Promise<{ id: string }>;
};

export default async function DebatePage({ params }: DebatePageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const debate = await prisma.debate.findFirst({
    where: {
      id : id,
      user_id: session.user.id,
    },
    include:{
      debateRounds: {
        include: { 
          evaluation: true,
          fallacy: true
         },
        orderBy : { roundNumber : "asc"},
      },
    },
  });

  if (!debate) {
    notFound();
  }

  
  return <DebateWorkspace debate = {debate} rounds = {debate.debateRounds}/>
  
}