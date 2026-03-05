/*
  Warnings:

  - You are about to drop the column `Privacy` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `Topic` on the `Group` table. All the data in the column will be lost.
  - Added the required column `topic` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "Privacy",
DROP COLUMN "Topic",
ADD COLUMN     "privacy" "Privacy" NOT NULL DEFAULT 'PUBLIC',
ADD COLUMN     "topic" TEXT NOT NULL;
