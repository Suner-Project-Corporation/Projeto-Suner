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
const pagAtual = window.location.pathname;
console.log(pagAtual);

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
  }, 5000);
}

// Player
var musicas = [];
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

const img = document.querySelector(".imagem-musica");
const titulo = document.getElementById("titulo-player-musica");
const album = document.getElementById("titulo-player-album");
const artistaPlayer = document.getElementById("titulo-player-artista");

// Função Display
function display() {
  if (indexmusica === -1) return;

  let musicaAtual = musicas[indexmusica];

  console.log(musicaAtual)

  img.src = musicaAtual.arquivoCapa;
  titulo.innerHTML = musicaAtual.titulo;
  album.innerHTML = musicaAtual.album;
  artistaPlayer.innerHTML = musicaAtual.artista
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
fetch("./src/json/musicas.json")
  .then(res => res.json())
  .then(data => {

    for (let artista in data) {
      const divArtista = document.createElement("div");
        divArtista.classList.add("icon");

        divArtista.innerHTML = `
            <img src="${data[artista][0].arquivoFotoArtista}" class="capa-artista">
            <h2 class="icon-nome">${artista}</h2>
            <h4 class="tipo">Artista</h4>
            <img src="/src/assets/image/tipoArtista.png" class="identificador-tipo-artista">
        `
        container.appendChild(divArtista)

      data[artista].forEach(musica => {
        musica.artista = artista
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
          <img src="./src/assets/image/botoes/botao_tocar.png" class="botao-play-icon">
          <img src="./src/assets/image/tipoMusica.png" class="identificador-tipo-icone">
        `;

          container.appendChild(divMusica);


          divMusica.addEventListener("click", () => {
            indexmusica = indexescolher;
            tocar();

          });

      });
    }

    let idP = sessionStorage.getItem("idPlaylist");
    if (pagAtual == "/src/pages/playlist.html")
      carregarMusicaPlaylist(Number(idP));
    console.log(idP)
  });

// Botão play
const btnplay = document.getElementById("botao-player-tocar");

btnplay.addEventListener("click", () => {
  if (indexmusica === -1) return;

  if (!player) return;

  if (player.paused) {
    player.play();
    btnplay.src = "/src/assets/image/botoes/botao_pausar.png";
  } else {
    player.pause();
    btnplay.src = "/src/assets/image/botoes/botao_tocar.png";
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
// script pra criar os icon de playlist na barra lateral :)
/* isso faz com que o script saiba em que id está as playlists,
só pra facilitar o rastreamento de tudo
*/

//script pro localstorage
async function criarLocalStorageArray(caminho) {
  try {
    const arquivo = await fetch(caminho);
    const arrayJSON = await arquivo.json();
    return arrayJSON;
  }
  catch (error) {
    console.error("deu erro na hora de fazer local storage mano");
  }
}

async function executarLocalStorage(nome, caminho) {
  const arrayStorage = await criarLocalStorageArray(caminho)
  if (arrayStorage) {
    localStorage.setItem(nome, JSON.stringify(arrayStorage));
  }

}

if (!localStorage.getItem("playlistsStorage")) {
  // esse caba verifica a existencia do playlistsStorage
  executarLocalStorage("playlistsStorage", '/src/json/playlists.json');
}
console.log(localStorage.getItem("playlistsStorage"));
console.log(JSON.parse(localStorage.getItem("playlistsStorage")));


function criarPlaylistIcon(nome, id) {
  const container = document.querySelector(".playlist-content"); // container base da playlist
  const playlistIcon = document.createElement("a"); // cria o elemento
  playlistIcon.classList.add("playlist-container"); // adiciona a classe
  playlistIcon.id = id; // adiciona o id
  playlistIcon.href = "/src/pages/playlist.html";
  // abaixo fica o innerHTML para adicionar os elementos dentro do playlistIcon
  playlistIcon.innerHTML = ` 
    <img class="playlist" src="/src/assets/image/playlist/capa_playlist.jpg">
    <h1 class="playlist-nome">${nome}</h1>
  `
  container.appendChild(playlistIcon); // esse caba faz com que seja criado dentro do container
}

async function carregarPlaylists() {
  try {
    const container = document.querySelector(".playlist-content");
    if (!container) return
    container.innerHTML = ".";
    const dados = JSON.parse(localStorage.getItem("playlistsStorage")).playlists; // aqui ele transforma em um array que o js pode ler
    dados.forEach(playlists => {
      criarPlaylistIcon(playlists.nome, playlists.id);
    });
    console.log(dados);
  } catch (error) {
    console.error("deu erro aqui parceiro, carregarPlaylist");
  }
}

function criarPlaylistJSON(nome, criador) {

  const dados = JSON.parse(localStorage.getItem("playlistsStorage"));
  const playlist =
  {
    id: dados.playlists.length,
    nome: nome,
    criador: criador,
    musicas: []
  };
  dados.playlists.push(playlist);
  localStorage.setItem("playlistsStorage", JSON.stringify(dados))
  console.log(localStorage.getItem("playlistsStorage"));
}

function fazerPlaylist() {
  const nomePlaylist = document.querySelector("#input-nomePlaylist").value;
  const nomeCriador = document.querySelector("#input-nomeCriador").value;
  if (!nomeCriador == "" && !nomePlaylist == "") {
    criarPlaylistJSON(nomePlaylist, nomeCriador);
    mostrarOcultarInputPlaylist();
    carregarPlaylists();
  }
}

function mostrarOcultarInputPlaylist() {
  const div = document.querySelector("#input-playlists");
  if (div.classList == "hide")
    div.classList.remove("hide");
  else
    div.classList.add("hide");

}
document.getElementById("btn-criarPlaylist").addEventListener('click', mostrarOcultarInputPlaylist)
document.getElementById("btn-confirmarPlaylist").addEventListener('click', fazerPlaylist);

carregarPlaylists();

function carregarMusicaPlaylist(idPlaylist) {
  try {
    const playlists = JSON.parse(localStorage.getItem("playlistsStorage"));
    const playlistAtual = playlists.playlists.find(p => p.id === idPlaylist);
    console.log(playlistAtual);
    const containerMusicas = document.querySelector(".playlist-musicaContainer");
    if (playlistAtual) {
      const nomePlaylist = document.querySelector(".playlist-namePage");
      const criadorPlaylist = document.querySelector(".criador-playlist");
      const musicasPlaylist = playlistAtual.musicas;
      nomePlaylist.textContent = playlistAtual.nome;
      criadorPlaylist.textContent = playlistAtual.criador;
      containerMusicas.innerHTML = "";
      musicasPlaylist.forEach(musga => {
        const musgaExata = musicas[musga];
        const musgaNome = musgaExata.titulo;
        const musgaArtista = "depois mexo nisso";
        const musgaCapa = musgaExata.arquivoCapa;
        const divMusga = document.createElement("div");
        divMusga.classList.add("musica-playlist");
        divMusga.id = musgaExata.id;
        divMusga.innerHTML = `
        <section>
          <img class="capa-musicaPlaylist" src="${musgaCapa}">
          <div class="info-musicaPlaylist">
            <h1 class="nome-musicaPlaylist">${musgaNome}</h1>
            <h1 class="artista-musicaPlaylist">${musgaArtista}</h1>
          </div>
        </section>
        <h1 class="tempo-musicaPlaylist">3:30</h1>
        <h1 class="toques-musicaPlaylist">980126789461287416</h1>`
        containerMusicas.appendChild(divMusga);
      });
    }
  }
  catch (error) {
    console.error('deu erro ao carregar as músicas na playlist man')
  }
}
// esse bloco abaixo é usado para 'pegar' o id da playlist clickada e carregar seus dados
document.querySelector(".playlist-content").addEventListener('click', (event) => {
  const a = event.target.closest(".playlist-container");
  const idClick = a.id;
  sessionStorage.setItem("idPlaylist", idClick)
});