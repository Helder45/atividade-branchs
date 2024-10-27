import inquirer from "inquirer";
import chalk from "chalk";
import { CamposVazios, SenhasDiferentes, UsuarioInexistente } from "../Erros.js";
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

  static async listAllUsersOnDatabase() {
    const usersList: users[] = await UserController.listAll();
    console.log("Lista de usuários:");
    for (let user of usersList) {
      console.log(
        "ID:",
        user.id,
        "\nNome de usuário:",
        user.name,
        "\nEmail do usuário:",
        user.email,
        "\nSenha do usuário:",
        user.password,
        "\n----------------"
      );
    }
  }

  static async listAnUserById() {
    await inquirer
      .prompt([
        {
          name: "userID",
          message: "Qual o ID do usuário que deseja listar?",
          type: "number",
        },
      ])
      .then(async (answers) => {
        if (
          answers === undefined ||
          answers.userID === null ||
          answers.userID === ""
        ) {
          throw new CamposVazios(
            chalk.red("O campo não pode estar vazio! Tente novamente!")
          );
        } else {
          const listedUser = await UserController.listByID(answers.userID);

          if (listedUser) {
            console.log(chalk.blue("Usuário encontrado!"));

            console.table({ listedUser });
          } else {
            throw new UsuarioInexistente(
              chalk.red("O usuário não foi encontrado! Tente novamente!")
            );
          }
        }
      })
      .catch((error) => {
        console.log("Erro encontrado: ", error.message);
      });
  }

}

export { UserView };
