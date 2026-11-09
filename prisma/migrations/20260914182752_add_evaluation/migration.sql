-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "evidenceScore" INTEGER NOT NULL,
    "logicScore" INTEGER NOT NULL,
    "relevanceScore" INTEGER NOT NULL,
    "counterargumentScore" INTEGER NOT NULL,
    "persuasivenessScore" INTEGER NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_roundId_key" ON "Evaluation"("roundId");

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "DebateRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
