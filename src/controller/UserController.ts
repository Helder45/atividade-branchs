import { users } from "@prisma/client";

export class UserController {
    static async createUser(user: users): Promise<void> {
        await createUser(user);
    }

    static async listAll(): Promise<users[]> {
      const users = await listAllUsers();
      return users;
    }
  
    static async listByID(userId: number): Promise<users | null> {
      const user = await listById(userId);
      return user;
    }

    static async updateUser(user: users): Promise<void> {
      await updateUser(user);
    }
}

import {
  createUser,
  listAllUsers,
  listById,
  updateUser
} from "../database/userDB";