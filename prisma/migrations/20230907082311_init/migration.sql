-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "drinkId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL
);
