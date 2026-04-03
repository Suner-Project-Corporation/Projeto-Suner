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

const container = document.querySelector("#volte-escutar");

// Banner
let imagens = [
  "./src/assets/image/banner/banner_epico.jfif",
  "./src/assets/image/banner/mikey.jpg"
];
let index = 0;

setInterval(() => {
  index = (index + 1) % imagens.length;
  document.getElementById("banner-bemvindo").src = imagens[index];
}, 3000);

// Player
let musicas = [];
let indexmusica = -1;
let player;

// Barra de progresso
const progresso = document.querySelector(".progresso-musica");
const ponto = document.querySelector(".bolinha-progresso");

progresso.style.width = "0%";
ponto.style.left = "0%";

// Configurar player
function configurarPlayer() {
  player.ontimeupdate = () => {
    if (!player.duration) return;

    let barra = (player.currentTime / player.duration) * 100;
    progresso.style.width = barra + "%";
    ponto.style.left = barra + "%";
  };

  player.onended = () => {
    indexmusica = (indexmusica + 1) % musicas.length;
    tocar();
  };
}

// Função Display
function display() {
  if (indexmusica === -1) return;

  const img = document.querySelector(".imagem-musica");
  const titulo = document.getElementById("titulo-player-musica");
  const album = document.getElementById("titulo-player-album");

  let musicaAtual = musicas[indexmusica];

  img.src = musicaAtual.arquivoCapa;
  titulo.innerHTML = musicaAtual.titulo;
  album.innerHTML = musicaAtual.album;
}

// Tocar música
function tocar() {
  if (indexmusica === -1) return;

  if (player) player.pause();

  player = new Audio(musicas[indexmusica].arquivo);
  configurarPlayer();
  player.play();

  display(); 
  btnplay.src = "./src/assets/image/botoes/botao_pausar.png";
}

// FETCH
fetch("./musicas.json")
  .then(res => res.json())
  .then(data => {

    for (let artista in data) {
      const divArtista = document.createElement("div");
      divArtista.classList.add("icon");

      divArtista.innerHTML = `
        <img src="${data[artista][0].arquivoFotoArtista}" class="capa-artista">
        <h2 class="icon-nome">${artista}</h2>
        <h4 class="tipo">Artista</h4>
      `;

      container.appendChild(divArtista);

      data[artista].forEach(musica => {
        musicas.push(musica);
        let indexescolher = musicas.length - 1;

        const divMusica = document.createElement("div");
        divMusica.classList.add("icon");

        divMusica.innerHTML = `
          <img src="${musica.arquivoCapa}" class="capa-musica">
          <h2 class="icon-nome">${musica.titulo}</h2>
          <h3 class="icon-artista">${artista}</h3>
          <h4 class="tipo">Música</h4>
        `;

        container.appendChild(divMusica);

        divMusica.addEventListener("click", () => {
          indexmusica = indexescolher;
          tocar();
        });
      });
    }
});

// Botão play
const btnplay = document.getElementById("botao-player-tocar");

btnplay.addEventListener("click", () => {
  if (indexmusica === -1) return;

  if (!player) return;

  if (player.paused) {
    player.play();
    btnplay.src = "./src/assets/image/botoes/botao_pausar.png";
  } else {
    player.pause();
    btnplay.src = "./src/assets/image/botoes/botao_tocar.png";
  }
});

// Botões avançar/voltar
const btnmudar = document.getElementsByClassName("botao-player-voltaravancar");

btnmudar[0].addEventListener("click", () => mudarmusica("-"));
btnmudar[1].addEventListener("click", () => mudarmusica("+"));

function mudarmusica(direcao) {
  if (musicas.length === 0) return;

  if (indexmusica === -1) {
    indexmusica = 0;
  } else {
    if (direcao === "+") {
      indexmusica = (indexmusica + 1) % musicas.length;
    } else {
      indexmusica = (indexmusica - 1 + musicas.length) % musicas.length;
    }
  }

  tocar();
}