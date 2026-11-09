/*
  Warnings:

  - You are about to drop the column `feedback` on the `Evaluation` table. All the data in the column will be lost.
  - Added the required column `counterargumentReason` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evidenceReason` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logicReason` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persuasivenessReason` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relevanceReason` to the `Evaluation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "feedback",
ADD COLUMN     "counterargumentReason" TEXT NOT NULL,
ADD COLUMN     "evidenceReason" TEXT NOT NULL,
ADD COLUMN     "logicReason" TEXT NOT NULL,
ADD COLUMN     "persuasivenessReason" TEXT NOT NULL,
ADD COLUMN     "relevanceReason" TEXT NOT NULL,
ALTER COLUMN "overallScore" SET DATA TYPE DOUBLE PRECISION;
