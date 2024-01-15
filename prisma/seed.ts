import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type User = {
  id: number;
  name: string;
  email: string;
};

export async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = (await res.json()) as User[];
  return users;
}

async function insertUsersFromAPI(users: User[]) {
  try {
    for (const user of users) {
      const prismaUser = {
        name: user.name,
        email: user.email,
      };

      await prisma.user.create({
        data: prismaUser,
      });
    }

    console.log('Users inserted successfully.');
  } catch (error) {
    console.error('Error inserting users:', error);
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
}

async function main() {
  const users = await getUsers();

  insertUsersFromAPI(users);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
