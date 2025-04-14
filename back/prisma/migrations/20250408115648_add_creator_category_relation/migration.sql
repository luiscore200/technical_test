/*
  Warnings:

  - You are about to drop the `_CreatorCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CreatorCategories";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_CategoryCreators" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoryCreators_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryCreators_B_fkey" FOREIGN KEY ("B") REFERENCES "Creator" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryCreators_AB_unique" ON "_CategoryCreators"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryCreators_B_index" ON "_CategoryCreators"("B");
