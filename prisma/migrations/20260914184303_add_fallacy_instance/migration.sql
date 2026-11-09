-- CreateEnum
CREATE TYPE "FallacyType" AS ENUM ('STRAW_MAN', 'FALSE_DILEMMA', 'AD_HOMINEM', 'HASTY_GENERALIZATION', 'CIRCULAR_REASONING', 'APPEAL_TO_AUTHORITY');

-- CreateTable
CREATE TABLE "FallacyInstance" (
    "id" TEXT NOT NULL,
    "debateRoundId" TEXT NOT NULL,
    "type" "FallacyType" NOT NULL,
    "explanation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FallacyInstance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FallacyInstance" ADD CONSTRAINT "FallacyInstance_debateRoundId_fkey" FOREIGN KEY ("debateRoundId") REFERENCES "DebateRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
