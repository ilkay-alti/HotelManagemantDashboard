/*
  Warnings:

  - Added the required column `statusId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "statusId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RoomStatus" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomStatus_status_key" ON "RoomStatus"("status");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "RoomStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
