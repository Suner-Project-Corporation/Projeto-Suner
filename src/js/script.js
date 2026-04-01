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

// Musicas
let musicas = [];
let indexmusica = 0;
let musica = document.getElementById("musica")

fetch("./musicas.json")
  .then(res => res.json())
  .then(data => {
    // transformar objeto em lista
    for (let artista in data) {
      data[artista].forEach(musica => {
        musicas.push(musica);
      });
    }
  });

    console.log(musicas); //teste

//Botão de play
const btnplay = document.getElementsByClassName("botao-player-tocar")[0];

btnplay.addEventListener("click", () => {
  if(musica.paused) {
    musica.play();
    //muda pra icone pausado aqui
  }else {
    musica.pause();
    //muda pra icone de tocar aqui
  }
});

//Botão de avançar e voltar:
window.addEventListener("load", () => {
  const btnmudar = document.getElementsByClassName("botao-player-voltaravancar");
  btnmudar[0].addEventListener("click", () => mudarmusica("-"));
  btnmudar[1].addEventListener("click", () => mudarmusica("+"));

function mudarmusica(direcao) {
  if (direcao === "+") {
    indexmusica = (indexmusica + 1) % musicas.length;
  } else {
    indexmusica = (indexmusica - 1 + musicas.length) % musicas.length;
  }
}
})



/*function mudarmusica(index) {
  switch(index) {
        case "+":
            musicas++;
            if(musicas == 4) {
                musicas = 1;
            }
            break;
        case "-":
            musicas--;
            if(musicas == 0) {
                musicas = 3;
            }
            break;
    }
} */
