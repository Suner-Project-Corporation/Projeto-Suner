// // define os elementos
// barraUser = document.getElementById("barra-user");
// mostra = document.getElementById("barra-user").classList;

// // controla a visiblidade da barra do usuário
// function visibilidadeBarraUser() {
//     if (mostra == "hide") {
//         barraUser.classList.remove("hide");
//         console.log("tu clicou");
//     }
//     else {
//         barraUser.classList.add("hide");
//         console.log("tu clicou");
//     }

// }

// // esses cabas abaixo é para definir quem fecha e abre o bglh da barra do user

// fotoPerfil = document.querySelector(".foto-perfil");
// fotoPerfil.addEventListener('click', visibilidadeBarraUser);

// btnFechar = document.getElementById("btn-fechar");
// btnFechar.addEventListener('click', visibilidadeBarraUser)

// // abaixo segue o código para mudar a cor do site
// function mudarCorSite() {
//     CorTema = document.getElementById("input-tema").value;
//     CorBG = document.getElementById("input-bg").value;
//     document.documentElement.style.setProperty('--CorTema', CorTema);
//     document.documentElement.style.setProperty('--CorFundo', CorBG);
// }

// btnMudarCor = document.getElementById("btn-mudar-cor");
// btnMudarCor.addEventListener('click', mudarCorSite);

container = document.querySelector("#volte-escutar");
//Código do banner:
let imagens = ["./src/assets/image/banner/banner_epico.jfif", "./src/assets/image/banner/mikey.jpg"];
let index = 0;

setInterval(() => {
  index = (index + 1) % imagens.length;
  document.getElementById("banner-bemvindo").src = imagens[index];
}, 3000)
// Declarando musicas
let musicas = [];
let indexmusica = 0;

function tocar() {
  player.pause()
  player = new Audio(musicas[indexmusica])
  player.play()
  btnplay.src = "./src/assets/image/botoes/botao_pausar.png"
}

fetch("./musicas.json")
  .then(res => res.json())
  .then(data => {

    for (let artista in data) {
      console.log(artista)
      const divArtista = document.createElement("div")
      divArtista.classList.add("icon")

      divArtista.innerHTML = `
            <img src="${data[artista][0].arquivoFotoArtista}" class="capa-artista">
            <h2 class="icon-nome">${artista}</h2>
            <h4 class="tipo">Artista</h4>
            <img src="./src/assets/image/tipoArtista.png" class="identificador-tipo-artista">
        `
      container.appendChild(divArtista)

      data[artista].forEach(musica => {

        // pega o arquivo
        console.log(musica.arquivo);

        // se quiser salvar tudo
        musicas.push(musica.arquivo);
        let indexescolher = musicas.length - 1

        console.log(indexescolher)

        const divMusica = document.createElement("div");
        divMusica.classList.add("icon");

        divMusica.innerHTML = `
                <img src="${musica.arquivoCapa}" class="capa-musica">
                <div class="container-texto-icon">
                  <h2 class="icon-nome">${musica.titulo}</h2>
                  <h3 class="icon-artista">${artista}</h3>
                  <h4 class="tipo">Música</h4>
                </div>
                <img src="./src/assets/image/tipoMusica.png" class="identificador-tipo-icone">
            `

        console.log(musica.titulo)

        container.appendChild(divMusica)

        divMusica.addEventListener("click", () => {
          console.log("wolfcut lindo");
          console.log(musica.titulo);
          indexmusica = indexescolher
          tocar();
        });
      });
    }

    console.log(musicas);

    player = new Audio(musicas[indexmusica])
    player.addEventListener("ended", function () {
      indexmusica += 1
      player = new Audio(musicas[indexmusica])
      player.play()
      btnplay.src = "./src/assets/image/botoes/botao_pausar.png"

    });
  });

//Botão de play
const btnplay = document.getElementById("botao-player-tocar");
btnplay.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    btnplay.src = "./src/assets/image/botoes/botao_pausar.png"
  } else {
    player.pause();
    btnplay.src = "./src/assets/image/botoes/botao_tocar.png"
  }
});

//Botão de avançar e voltar:
const btnmudar = document.getElementsByClassName("botao-player-voltaravancar");
btnmudar[0].addEventListener("click", () => mudarmusica("-"));
btnmudar[1].addEventListener("click", () => mudarmusica("+"));

function mudarmusica(direcao) {
  if (direcao === "+") {
    indexmusica = (indexmusica + 1) % musicas.length;
  } else {
    indexmusica = (indexmusica - 1 + musicas.length) % musicas.length;
  }
  player.pause()
  player = new Audio(musicas[indexmusica])
  player.play()
  btnplay.src = "./src/assets/image/botoes/botao_pausar.png"
}