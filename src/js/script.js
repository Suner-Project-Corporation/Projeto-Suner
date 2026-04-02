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

fetch("./musicas.json")
  .then(res => res.json())
  .then(data => {

    for (let artista in data) {
      data[artista].forEach(musica => {

        // pega o arquivo
        console.log(musica.arquivo);

        // se quiser salvar tudo
        musicas.push(musica.arquivo);
      });
    }

    console.log(musicas);
      
    player = new Audio(musicas[indexmusica])
    player.addEventListener("ended", function(){
    indexmusica += 1
    player = new Audio(musicas[indexmusica])
    player.play()
    btnplay.src = "./src/assets/image/botoes/botao_pausar.png"
    
});
  });

  //Botão de play
 const btnplay = document.getElementById("botao-player-tocar");
  btnplay.addEventListener("click", () => {
  if(player.paused) {
    player.play();
    btnplay.src = "./src/assets/image/botoes/botao_pausar.png"
  }else {
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

function escolher(indexmusica) {

}