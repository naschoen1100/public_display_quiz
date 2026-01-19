import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  //url: "file:prisma/dev.db",
  url: 'file:./prisma/dev.db',
});
const prisma = new PrismaClient({ adapter });

export default prisma;
