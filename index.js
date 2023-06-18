import fs from "fs";
import chalk from "chalk";

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "não há arquivo no diretório"));
}

async function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  try {
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    extraiLinks(texto);
  } catch (erro) {
    trataErro(erro);
  }
}

function extraiLinks(link) {
  const regex = /\[([^\[^\]]*?)\]\((https?:\/\/[^\s\?#.]*.[^\s]*)\)/gm;
  const capturas = [...link.matchAll(regex)];
  const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }));
  console.log("resultados :>> ", resultados);
}

pegaArquivo("./arquivos/texto.md");
