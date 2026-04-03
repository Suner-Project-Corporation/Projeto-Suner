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

// Código do banner:
let imagens = ["./src/assets/image/banner/banner_epico.jfif", "./src/assets/image/banner/mikey.jpg"];
let index = 0;

setInterval(() => {
  index = (index + 1) % imagens.length;
  document.getElementById("banner-bemvindo").src = imagens[index];
}, 3000);

// Declaran musicas
let musicas = [];
let indexmusica = 0;
let player;

// Barra de progresso
const progresso = document.querySelector(".progresso-musica");
const ponto = document.querySelector(".bolinha-progresso");

progresso.style.width = "0%";
ponto.style.left = "0%";

// Configurar o player
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

// Função de tocar musica
function tocar() {
  if (player) player.pause();

  player = new Audio(musicas[indexmusica]);
  configurarPlayer(); //
  player.play();

  btnplay.src = "./src/assets/image/botoes/botao_pausar.png";
}

// Formatação do tempo
function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg < 10 ? "0" : ""}${seg}`;
}

// FETCH
fetch("./musicas.json")
  .then(res => res.json())
  .then(data => {

    const img = document.querySelector(".imagem-musica")
    const titulo = document.getElementById("titulo-player-musica")
    const album = document.getElementById("titulo-player-album")
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
        musicas.push(musica.arquivo);
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
          console.log("wolfcut lindo");
          tocar();
          img.src = musica.arquivoCapa;
          titulo.innerHTML = musica.titulo;
          album.innerHTML = musica.album
        
        });
      });
    }

    // Inicializar o player
    player = new Audio(musicas[indexmusica]);
    configurarPlayer(); 
  });

// Botão de play
const btnplay = document.getElementById("botao-player-tocar");

btnplay.addEventListener("click", () => {
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
  if (direcao === "+") {
    indexmusica = (indexmusica + 1) % musicas.length;
  } else {
    indexmusica = (indexmusica - 1 + musicas.length) % musicas.length;
  }
  tocar();
}