const axios = require("axios");
const fs = require("fs");

// Requisição http
// pegar o arquivo
// escrever o arquivo num diretório, se o diretorio não existir a gente vai criar
async function downloadImage(capitulo, pagina) {
  const nomeManga = "naruto";
  const diretorio = `${nomeManga}/${capitulo}`;
  fs.promises.mkdir(diretorio, { recursive: true });
  const baseUrl = `https://img.mangaschan.com/uploads/manga-images/n/naruto/capitulo-${capitulo}/${pagina}.jpg`;
  try {
    const response = await axios.get(baseUrl, { responseType: "arraybuffer" });
    fs.writeFile(`${diretorio}/pagina-${pagina}.jpg`, response.data, () => {});
  } catch (error) {
    console.error(error);
  }
}

for (let pagina = 2; pagina <= 23; pagina++) {
  downloadImage(700, pagina);
}
