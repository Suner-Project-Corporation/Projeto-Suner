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

let container = document.querySelector("#volte-escutar");
const pagAtual = window.location.pathname;
const BASE = window.location.hostname.includes("github.io")
  ? "/Projeto-Suner/"
  : "/";
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

//Mexer na barra
const barra = document.querySelector(".barra-progresso");

let arrastando = false;
let porcentagemAtual = 0;

barra.addEventListener("mousedown", () => {
  arrastando = true;
});

document.addEventListener("mouseup", () => {
  if (!arrastando || !player || isNaN(player.duration)) return;
  arrastando = false;

  //Atualiza o tempo quando solta
  player.currentTime = porcentagemAtual * player.duration;
});

//Alterar com o mover do mouse
document.addEventListener("mousemove", (e) => {
  if (!arrastando || !player || isNaN(player.duration)) return;

  const rect = barra.getBoundingClientRect();
  let posX = e.clientX - rect.left;

  if (posX < 0) posX = 0;
  if (posX > rect.width) posX = rect.width;

  porcentagemAtual = posX / rect.width;

  // Só atualiza visual enquanto arrasta
  progresso.style.width = (porcentagemAtual * 100) + "%";
  ponto.style.left = (porcentagemAtual * 100) + "%";


});
//Alterar com o click na barra
barra.addEventListener("click", (e) => {
  if (!player || isNaN(player.duration)) return;

  const rect = barra.getBoundingClientRect();
  let posX = e.clientX - rect.left;

  if (posX < 0) posX = 0;
  if (posX > rect.width) posX = rect.width;

  porcentagemAtual = posX / rect.width;

  progresso.style.width = (porcentagemAtual * 100) + "%";
  ponto.style.left = (porcentagemAtual * 100) + "%";

  player.currentTime = porcentagemAtual * player.duration;
});

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
    imagemMutar.src = BASE + "/src/assets/image/botoes/volumeMutado.png"
  } else {
    player.volume = 0.2;
    barravolume.value = 20;
    imagemMutar.src = BASE + "/src/assets/image/botoes/volume.png"
  }

  handleInput(slider)
});

// Configurar player
function configurarPlayer() {

  player.volume = barravolume.value / 100

  player.ontimeupdate = () => {
    if (isNaN(player.duration) || arrastando) return;

    let barra = (player.currentTime / player.duration) * 100;
    progresso.style.width = barra + "%";
    ponto.style.left = barra + "%";

    // Tempo atual
    tempoAtual.innerHTML = formatarTempo(player.currentTime);
  };

  player.onended = () => {
    if (window.location.pathname.includes("playlist.html") || window.hostname.pathname.includes("playlist.html")) {
      const playlists = JSON.parse(localStorage.getItem("playlistsStorage"));
      const playlistAtual = playlists.playlists[sessionStorage.getItem("idPlaylist")];
      const musicasPlaylist = playlistAtual.musicas;
      console.log(musicasPlaylist)
      const musicaSelecionada = musicasPlaylist[indexmusica];
      player = new Audio(BASE + musicas[Number(musicaSelecionada)].arquivo)
      console.log(musicaSelecionada, musicas[Number(musicaSelecionada)])
      indexmusica = (indexmusica + 1) % musicasPlaylist.length;
    } else
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

  if (window.location.pathname.includes("playlist.html")) {
    const playlists = JSON.parse(localStorage.getItem("playlistsStorage"));
    const playlistAtual = playlists.playlists[sessionStorage.getItem("idPlaylist")];
    const musicasPlaylist = playlistAtual.musicas;
    console.log(musicasPlaylist)
    const musicaSelecionada = musicasPlaylist[Number(indexmusica)];
    console.log(musicaSelecionada, musicas[Number(musicaSelecionada)]);
    var musicaAtual = musicas[musicaSelecionada]
  } else {
    var musicaAtual = musicas[indexmusica];
  }

  console.log(musicaAtual)

  img.src = BASE + musicaAtual.arquivoCapa;
  titulo.innerHTML = musicaAtual.titulo;
  album.innerHTML = musicaAtual.album;
  artistaPlayer.innerHTML = musicaAtual.artista
}

// Tocar música
function tocar() {
  if (indexmusica === -1) return;

  if (player) player.pause();

  if (window.location.pathname.includes("playlist.html")) {

    const playlists = JSON.parse(localStorage.getItem("playlistsStorage"));

    const playlistAtual = playlists.playlists[sessionStorage.getItem("idPlaylist")];

    const musicasPlaylist = playlistAtual.musicas;

    console.log(musicasPlaylist)

    const musicaSelecionada = musicasPlaylist[Number(indexmusica)];

    player = new Audio(BASE + musicas[Number(musicaSelecionada)].arquivo)

    console.log(musicaSelecionada, musicas[Number(musicaSelecionada)])

  } else

    player = new Audio(BASE + musicas[indexmusica].arquivo);

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

  btnplay.src = BASE + "src/assets/image/botoes/botao_pausar.png";

}



//Volume -- Barra e Botão de mutar
const slider = document.querySelector('#volume-bar');

const handleInput = (el) => {
  const min = el.min || 0;
  const max = el.max || 100;
  const pct = (el.value - min) / (max - min) * 100;
  el.style.setProperty('--range-pct', pct + '%');
  volume = el.value

  if (volume <= 0) {
    imagemMutar.src = BASE + "src/assets/image/botoes/volumeMutado.png"
  } else {
    imagemMutar.src = BASE + "src/assets/image/botoes/volume.png"
  }
};

slider.addEventListener('input', (e) => handleInput(e.target));
handleInput(slider);

// FETCH
//if (BASE + "src/json/musicas.json")
//console.log('tudo certo');
fetch(BASE + "src/json/musicas.json")
  .then(res => res.json())
  .then(data => {
    console.log('tudo certo');

    for (let artista in data) {
      const divArtista = document.createElement("div");
      divArtista.classList.add("icon");

      divArtista.addEventListener("click", () => {
        window.location.href = "./src/pages/artista.html";
      });

      divArtista.innerHTML = `
            <img src="${data[artista][0].arquivoFotoArtista}" class="capa-artista">
            <h2 class="icon-nome">${artista}</h2>
            <h4 class="tipo">Artista</h4>
            <img src="${BASE}src/assets/image/tipoArtista.png" class="identificador-tipo-artista">
        `
      if (container){
        if (container.childElementCount >= 15) {
          container = document.querySelector("#fora-radar")
        }
        container.appendChild(divArtista) 
      }
      console.log("artista carregado")

      data[artista].forEach(musica => {
        musica.artista = artista
        musicas.push(musica);
        //console.log(musicas);
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
        if (container){
          if (container.childElementCount >= 15) {
            container = document.querySelector("#fora-radar")
          }
          container.appendChild(divMusica);
        }

        divMusica.addEventListener("click", () => {
          indexmusica = indexescolher;
          tocar();

        });



      });
    };

    let idP = sessionStorage.getItem("idPlaylist");
    if (pagAtual == BASE + "src/pages/playlist.html") {
      carregarMusicaPlaylist(Number(idP));
    }
    console.log(idP)
    console.log(musicas);
    carregarMusgaAdd()
  });



// Botão play
const btnplay = document.getElementById("botao-player-tocar");

btnplay.addEventListener("click", () => {
  if (indexmusica === -1) return;

  if (!player) return;

  if (player.paused) {
    player.play();
    btnplay.src = BASE + "src/assets/image/botoes/botao_pausar.png";
  } else {
    player.pause();
    btnplay.src = BASE + "src/assets/image/botoes/botao_tocar.png";
  }
});

// Botões avançar/voltar
const btnmudar = document.getElementsByClassName("botao-player-voltaravancar");

btnmudar[0].addEventListener("click", () => mudarmusica("-"));
btnmudar[1].addEventListener("click", () => mudarmusica("+"));

function mudarmusica(direcao) {
  if (window.location.pathname.includes("playlist.html") || window.hostname.pathname.includes("playlist.html")) {
    const playlists = JSON.parse(localStorage.getItem("playlistsStorage"))
    const idmudar = sessionStorage.getItem("idPlaylist")
    const playlistAtual = playlists.playlists[sessionStorage.getItem("idPlaylist")]
    console.log(playlistAtual, playlists, idmudar);


    if (musicas.length === 0) return;
    if (indexmusica === -1) {
      indexmusica = 0;
    } else {
      if (direcao === "+") {
        indexmusica = (indexmusica + 1) % playlistAtual.musicas.length;
      } else {
        indexmusica = (indexmusica - 1 + playlistAtual.musicas.length) % playlistAtual.musicas.length;
      }
    }

    tocar()
  } else {
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
}

// script pra criar os icon de playlist na barra lateral :)
/* isso faz com que o script saiba em que id está as playlists,
só pra facilitar o rastreamento de tudo
*/

//script pro localstorage
async function criarLocalStorageArray(caminho) {
  try {
    const arquivo = await fetch(caminho);

    if (!arquivo.ok) {
      throw new Error("Erro no fetch: " + arquivo.status);
    }

    const arrayJSON = await arquivo.json();
    return arrayJSON;
  }
  catch (error) {
    console.error(error);
  }
}

async function executarLocalStorage(nome, caminho) {
  const arrayStorage = await criarLocalStorageArray(caminho)
  if (arrayStorage) {
    localStorage.setItem(nome, JSON.stringify(arrayStorage));
  }

}

async function inicializarLocalStorage() {
  //resetar storage
  if (!localStorage.getItem("playlistsStorage")) {
    await executarLocalStorage("playlistsStorage", BASE + 'src/json/playlists.json');
  }

  console.log(localStorage.getItem("playlistsStorage"));
  console.log(JSON.parse(localStorage.getItem("playlistsStorage")));
}

inicializarLocalStorage();
console.log(localStorage.getItem("playlistsStorage"));
console.log(JSON.parse(localStorage.getItem("playlistsStorage")));

async function initStorage() {
  await inicializarLocalStorage();
  carregarPlaylists();
}

initStorage();

function criarPlaylistIcon(nome, id) {
  const container = document.querySelector(".playlist-content"); // container base da playlist
  const playlistIcon = document.createElement("a"); // cria o elemento
  playlistIcon.classList.add("playlist-container"); // adiciona a classe
  playlistIcon.id = id; // adiciona o id
  playlistIcon.href = BASE + "src/pages/playlist.html";
  // abaixo fica o innerHTML para adicionar os elementos dentro do playlistIcon
  playlistIcon.innerHTML = ` 
    <img class="playlist" src="${BASE}src/assets/image/playlist/capa_playlist.jpg">
    <h1 class="playlist-nome">${nome}</h1>
  `
  container.appendChild(playlistIcon); // esse caba faz com que seja criado dentro do container
}

async function carregarPlaylists() {
  const container = document.querySelector(".playlist-content");
  if (!container) return
  container.innerHTML = ".";
  const dados = JSON.parse(localStorage.getItem("playlistsStorage")).playlists; // aqui ele transforma em um array que o js pode ler
  dados.forEach(playlists => {
    criarPlaylistIcon(playlists.nome, playlists.id);
  });
  console.log(dados);
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

function carregarMusicaPlaylist(idPlaylist) {
  try {
    const playlists = JSON.parse(localStorage.getItem("playlistsStorage"));
    console.log(playlists);
    const playlistAtual = playlists.playlists.find(p => p.id === idPlaylist);
    console.log(playlistAtual);
    const containerMusicas = document.querySelector(".playlist-musicaContainer");
    if (playlistAtual) {
      const nomePlaylist = document.querySelector(".playlist-namePage");
      const criadorPlaylist = document.querySelector(".criador-playlist");
      const musicasPlaylist = playlistAtual.musicas;
      document.getElementById("qtd-musicaPlaylist").textContent = musicasPlaylist.length;
      nomePlaylist.textContent = playlistAtual.nome;
      criadorPlaylist.textContent = playlistAtual.criador;
      containerMusicas.innerHTML = "";
      let indexescolher = musicasPlaylist.length - 1
      let contadorMusga = 0;
      musicasPlaylist.forEach(musga => {
        console.log(musga);
        const musgaExata = musicas[musga];
        console.log(musgaExata)
        const musgaNome = musgaExata.titulo;
        const musgaArtista = musgaExata.artista;
        const musgaCapa = musgaExata.arquivoCapa;
        const divMusga = document.createElement("div");
        divMusga.classList.add("musica-playlist");
        divMusga.id = musga;

        console.log(divMusga.id);
        console.log(musgaExata);
        divMusga.innerHTML = `
        <section>
          <img class="capa-musicaPlaylist" src="${BASE + musgaCapa}">
          <div class="info-musicaPlaylist">
            <h1 class="nome-musicaPlaylist">${musgaNome}</h1>
            <h1 class="artista-musicaPlaylist">${musgaArtista}</h1>
          </div>
        </section>
        <h1 class="tempo-musicaPlaylist">3:30</h1>
        <h1 class="toques-musicaPlaylist">10000</h1>
        <button type='button' class='btn-apagarMusga' id='0${contadorMusga}'>Remover</button>`
        containerMusicas.appendChild(divMusga);
        const btnApagar = document.getElementById("0" + contadorMusga)
        btnApagar.addEventListener("click", () => {
          console.log(btnApagar.id)
          removerMusga(btnApagar.id);
          carregarMusicaPlaylist(Number(sessionStorage.getItem("idPlaylist")))
        })
        divMusga.addEventListener("click", () => {
          indexescolher = btnApagar.id;
          indexmusica = indexescolher;
          tocar();
        })
        contadorMusga++;
      })
    }
  }
  catch (error) {
    console.error('deu erro ao carregar as músicas na playlist man')
  }
}
// esse bloco abaixo é usado para 'pegar' o id da playlist clickada e carregar seus  dados
document.querySelector(".playlist-content").addEventListener('click', (event) => {
  const a = event.target.closest(".playlist-container");
  const idClick = a.id;
  console.log(idClick);
  sessionStorage.setItem("idPlaylist", idClick);
  console.log(sessionStorage.getItem("idPlaylist"));
});


function carregarMusgaAdd() {
  musicas.forEach(Musca => {
    const containerAdd = document.getElementById("container-addMusica")
    const divAdd = document.createElement("div");
    divAdd.classList.add("addMusica");
    divAdd.id = musicas.indexOf(Musca);
    divAdd.innerHTML = `
    <div>
      <h1>${Musca.titulo}</h1>
      <h2>${Musca.artista}</h2>
    </div>
    `;
    divAdd.addEventListener("click", () => {
      adicionarMusga(divAdd.id);
    })
    containerAdd.appendChild(divAdd);
  })
}

document.getElementById("btn-fecharAddMusica").addEventListener("click", () => {
  document.getElementById("div-addMusica").classList.add("hide")
}
);

document.getElementById("btn-addMusica").addEventListener("click", () => {
  document.getElementById("div-addMusica").classList.remove("hide")
}
)

function adicionarMusga(idMusica) {
  const playlists = JSON.parse(localStorage.getItem("playlistsStorage"));
  const playlistAtual = playlists.playlists[sessionStorage.getItem("idPlaylist")]
  const musicasPlaylist = playlistAtual.musicas;
  musicasPlaylist.push(idMusica);
  playlistAtual.musicas = musicasPlaylist;
  playlists.playlists[sessionStorage.getItem("idPlaylist")] = playlistAtual
  console.log(playlistAtual, playlists, musicasPlaylist);
  const playlistsString = JSON.stringify(playlists);
  localStorage.setItem("playlistsStorage", playlistsString);
  console.log(JSON.stringify(playlists), localStorage.getItem("playlistsStorage"));

  carregarMusicaPlaylist(Number(sessionStorage.getItem("idPlaylist")));
}

function removerMusga(idMusica) {
  const playlists = JSON.parse(localStorage.getItem("playlistsStorage"));
  const playlistAtual = playlists.playlists[sessionStorage.getItem("idPlaylist")]
  const musicasPlaylist = playlistAtual.musicas;
  musicasPlaylist.splice(idMusica, 1);
  playlistAtual.musicas = musicasPlaylist;
  playlists.playlists[sessionStorage.getItem("idPlaylist")] = playlistAtual
  console.log(playlistAtual, playlists, musicasPlaylist);
  const playlistsString = JSON.stringify(playlists);
  localStorage.setItem("playlistsStorage", playlistsString);
  console.log(JSON.stringify(playlists), localStorage.getItem("playlistsStorage"));
}