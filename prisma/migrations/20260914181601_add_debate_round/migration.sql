-- CreateTable
CREATE TABLE "DebateRound" (
    "id" TEXT NOT NULL,
    "debateId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "userArgument" TEXT NOT NULL,
    "aiArgument" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DebateRound_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DebateRound_debateId_roundNumber_key" ON "DebateRound"("debateId", "roundNumber");

-- AddForeignKey
ALTER TABLE "DebateRound" ADD CONSTRAINT "DebateRound_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES "Debate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
