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
  "./src/assets/image/banner/banner1.png",
  "./src/assets/image/banner/banner2.png"
];
let index = 0;

if (document.getElementById("banner-bemvindo")) {
  setInterval(() => {
    index = (index + 1) % imagens.length;
    document.getElementById("banner-bemvindo").src = imagens[index];
  }, 10000);
}

// Player
let musicas = [];
let indexmusica = -1;
let player;
let volume = 50

// Barra de progresso
const progresso = document.querySelector(".progresso-musica");
const ponto = document.querySelector(".bolinha-progresso");
const tempoAtual = document.getElementById("tempo-atual");
const tempoTotal = document.getElementById("tempo-total");

//Função formatar o tempo
function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg < 10 ? "0" : ""}${seg}`;
}

progresso.style.width = "0%";
ponto.style.left = "0%";

const barravolume = document.getElementById("volume-bar")
const btnmutar = document.getElementById("btn-mutar")
const imagemMutar = document.querySelector(".imagem-botao-mutar")
let mutado = false

barravolume.addEventListener("input", () => {
  if (!player) return;

  player.volume = barravolume.value / 100;
});

btnmutar.addEventListener("click", () => {
  if (!player) return;

  mutado = !mutado;

  if (mutado) {
    player.volume = 0;
    barravolume.value = 0;
    imagemMutar.src = "/src/assets/image/botoes/volumeMutado.png"
  } else {
    player.volume = 0.2;
    barravolume.value = 20;
    imagemMutar.src = "/src/assets/image/botoes/volume.png"
  }

  handleInput(slider)
});

// Configurar player
function configurarPlayer() {

  player.volume = barravolume.value / 100

  player.ontimeupdate = () => {
    if (isNaN(player.duration)) return;

    let barra = (player.currentTime / player.duration) * 100;
    progresso.style.width = barra + "%";
    ponto.style.left = barra + "%";

    // Tempo atual
    tempoAtual.innerHTML = formatarTempo(player.currentTime);
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

  // Resetar tempo de musica
  tempoAtual.innerHTML = "0:00";
  tempoTotal.innerHTML = "0:00";

  // Pega a duração da musica
  player.addEventListener("loadedmetadata", () => {
    console.log(player.duration)
    tempoTotal.innerHTML = formatarTempo(player.duration);
  });

  player.play();

  display();
  btnplay.src = "./src/assets/image/botoes/botao_pausar.png";
}

//Volume -- Barra e Botão de mutar
const slider = document.querySelector('#volume-bar');

const handleInput = (el) => {
  const min = el.min || 0;
  const max = el.max || 100;
  const pct = (el.value - min) / (max - min) * 100;
  el.style.setProperty('--range-pct', pct + '%');
  volume = el.value

  if (volume <= 0){
    imagemMutar.src = "/src/assets/image/botoes/volumeMutado.png"
  } else {
    imagemMutar.src = "/src/assets/image/botoes/volume.png"
  }
};

slider.addEventListener('input', (e) => handleInput(e.target));
handleInput(slider);

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
            <img src="./src/assets/image/tipoArtista.png" class="identificador-tipo-artista">
        `
      container.appendChild(divArtista)

      data[artista].forEach(musica => {
        musicas.push(musica);
        let indexescolher = musicas.length - 1;

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