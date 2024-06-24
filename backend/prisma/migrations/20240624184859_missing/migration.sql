/*
  Warnings:

  - Added the required column `alertId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Alert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Alert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alertId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "alertId" INTEGER NOT NULL,
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "reasons" TEXT[],
ADD COLUMN     "responsibleId" INTEGER,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "alertId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "Alert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
