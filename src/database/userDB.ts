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

  const listAllUsers = async () => {
    const usuarios = await prisma.users.findMany();
    return usuarios;
  };

  const listById = async (userId: number): Promise<users | null> => {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  };

  const updateUser = async (user: users) => {
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  };

export {
    createUser,
    listAllUsers,
    listById,
    updateUser
};