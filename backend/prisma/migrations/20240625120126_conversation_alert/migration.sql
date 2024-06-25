/*
  Warnings:

  - You are about to drop the column `alertId` on the `Conversation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[conversationId]` on the table `Alert` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conversationId` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "conversationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "alertId";

-- CreateIndex
CREATE UNIQUE INDEX "Alert_conversationId_key" ON "Alert"("conversationId");

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
