/*
  Warnings:

  - Added the required column `essayId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "essayId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_essayId_fkey" FOREIGN KEY ("essayId") REFERENCES "Essay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
