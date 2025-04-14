/*
  Warnings:

  - The primary key for the `ContentRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categories` on the `ContentRequest` table. All the data in the column will be lost.
  - You are about to drop the column `creditsConsumed` on the `ContentRequest` table. All the data in the column will be lost.
  - Added the required column `category` to the `ContentRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `ContentRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SuggestedCC" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contentRequestId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "SuggestedCC_contentRequestId_fkey" FOREIGN KEY ("contentRequestId") REFERENCES "ContentRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SuggestedCC_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Credit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Credit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "creditLimit" INTEGER NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "_CreatorCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CreatorCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CreatorCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Creator" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "subscriptionPlanId" INTEGER,
    CONSTRAINT "Company_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("email", "id", "password") SELECT "email", "id", "password" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
CREATE TABLE "new_ContentRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ContentRequest" ("companyId", "duration", "format", "id") SELECT "companyId", "duration", "format", "id" FROM "ContentRequest";
DROP TABLE "ContentRequest";
ALTER TABLE "new_ContentRequest" RENAME TO "ContentRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CreatorCategories_AB_unique" ON "_CreatorCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_CreatorCategories_B_index" ON "_CreatorCategories"("B");
