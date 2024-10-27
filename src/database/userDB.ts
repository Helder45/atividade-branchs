import { PrismaClient, users } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async (user: users) => {
    await prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  };

export {
    createUser
};