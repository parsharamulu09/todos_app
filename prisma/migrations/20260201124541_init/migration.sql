/*
  Warnings:

  - You are about to drop the `TODO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TODO";

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
