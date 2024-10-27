import { users } from "@prisma/client";

export class UserController {
    static async createUser(user: users): Promise<void> {
        await createUser(user);
    }
}

import {
  createUser,
} from "../database/userDB";