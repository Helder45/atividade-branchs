import chalk from "chalk";
class CamposVazios extends Error {
    constructor(msg) {
        super(msg);
        this.name = chalk.red("Erro de campos vazios: ");
    }
}
class SenhasDiferentes extends Error {
    constructor(msg) {
        super(msg);
        this.name = chalk.red("Erro de senha: ");
    }
}
export { CamposVazios, SenhasDiferentes };
