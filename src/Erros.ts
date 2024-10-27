import chalk from "chalk";


class CamposVazios extends Error {
    constructor(msg: any) {
        super(msg);
        this.name = chalk.red("Erro de campos vazios: ");
    }
}

class SenhasDiferentes extends Error {
    constructor(msg: any) {
        super(msg);
        this.name = chalk.red("Erro de senha: ");
    }
}

class UsuarioInexistente extends Error {
    constructor(msg: any) {
        super(msg);
        this.name = chalk.red("Erro de usuário não encontrado: ");

    }
}


export { CamposVazios, SenhasDiferentes, UsuarioInexistente };
