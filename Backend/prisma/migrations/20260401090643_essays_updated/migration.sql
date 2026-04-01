/*
  Warnings:

  - You are about to drop the column `editedAt` on the `Essay` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Essay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Essay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Essay" DROP COLUMN "editedAt",
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Essay_authorId_idx" ON "Essay"("authorId");

-- CreateIndex
CREATE INDEX "Essay_groupId_idx" ON "Essay"("groupId");

-- AddForeignKey
ALTER TABLE "Essay" ADD CONSTRAINT "Essay_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
