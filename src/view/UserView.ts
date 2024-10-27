import inquirer from "inquirer";
import chalk from "chalk";
import { CamposVazios, SenhasDiferentes } from "../Erros.js";
import { users } from "@prisma/client";
import { UserController } from "../controller/UserController.js";

class UserView {
  static async createAnUser() {
    await inquirer
      .prompt([
        {
          name: "userName",
          message: "Qual o nome do usuário que deseja criar?",
          type: "input",
        },
        {
          name: "userEmail",
          message: "Qual o email do usuário que deseja criar?",
          type: "input",
        },
        {
          name: "userPassword",
          message: "Qual a senha do usuário que deseja criar?",
          type: "password",
          mask: true,
        },
        {
          name: "userPasswordConfirm",
          message: "Confirme a senha do usuário.",
          type: "password",
          mask: true,
        },
      ])
      .then(async (answers) => {
        if (
          answers.userName === "" ||
          answers.userEmail === "" ||
          answers.userPassword === "" ||
          answers.userPasswordConfirm === "" ||
          answers === undefined
        ) {
          throw new CamposVazios(
            chalk.red("É preciso preencher corretamente todos os campos!")
          );
        } else {
          if (answers.userPassword === answers.userPasswordConfirm) {
            const newUser: users = {
              id: 0,
              name: answers.userName,
              email: answers.userEmail,
              password: answers.userPassword,
            };

            await UserController.createUser(newUser);
            console.log(chalk.green(`Novo usuário criado!`));
          } else {
            throw new SenhasDiferentes(
              chalk.red("As senhas inseridas devem ser iguais.")
            );
          }
        }
      })
      .catch((error) => {
        console.log(typeof error.code);

        if (error.code === "P2002") {
          console.log(
            chalk.red("Erro: Este e-mail já está cadastrado no sistema!")
          );
        }
        console.log(error.message);
      });
  }
}

export { UserView };
