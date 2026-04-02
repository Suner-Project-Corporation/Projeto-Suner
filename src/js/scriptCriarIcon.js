container = document.querySelector("#volte-escutar");

fetch("../musicas.json")
  .then(res => res.json())
  .then(data => {
    console.log("JSON carregado:", data);

    Object.entries(data).forEach(([artista, musicas]) => {

        container.innerHTML += `
            <div class="icon">

                <img src="${musicas[0].arquivoFotoArtista}" class="capa-artista">
                <h2 class="icon-nome">${artista}</h2>
                <h4 class="tipo">Artista</h4>
            </div>
            `

        musicas.forEach((musica, index) => {

            container.innerHTML += `
                <div class="icon">

                    <img src="${musica.arquivoCapa}" class="capa-musica">
                    <h2 class="icon-nome">${musica.titulo}</h2>
                    <h3 class="icon-artista">${artista}</h3>
                    <h4 class="tipo">Música</h4>
                </div>
                `

            console.log(container)
            });
        });
    })
  .catch(err => console.error("Erro ao carregar JSON:", err));

// var jsmediatags = window.jsmediatags;


// // esse mano identifica a pag atual
// pagAtual = window.location.pathname;
// // esse mano é a lista de metadados que temos
// var dados = [
//     {tipo:"musica", nome:"jorge da quebrada", artista:"farmador de aura supremo", imagem:"imagem_capa_teste.jfif"},
//     {tipo:"musica", nome:"jorge da quebrada", artista:"farmador de aura supremo", imagem:"imagem_capa_teste.jfif"},
//     {tipo:"musica", nome:"jorge da quebrada", artista:"farmador de aura supremo", imagem:"imagem_capa_teste.jfif"},
//     {tipo:"artista", nome:"jorge da quebrada",artista:'', imagem:"imagem_capa_teste.jfif"}
// ]
// // esse caba cria as div pras musicas, artistas, albuns etc.
// function CriarIconInicial(tipo, imagem, nome, artista, cont) {
//     container = document.querySelector(cont);
//     container.innerHTML += `
//         <div class='icon'>

//             <div class='icon-btn-play'>
//                 <div class='icon-barra-play'></div>
//             </div>
//             <img src='./src/assets/image/musicas/${imagem}' class='capa-${tipo}'>
//             <h2 class='icon-nome texto-responsivo-cor'>${nome}</h2>
//             <h3 class='icon-artista texto-responsivo-cor'>${artista}</h3>
//             <h4 class='tipo texto-responsivo-cor'>${tipo}</h4>

//         </div>`;
// }

// // essa verificação acontece para que saibamos qual pag que vai estar, assim decidindo tipos diferentes de elementos
// if (pagAtual == "/") {
//     dados.forEach(dados => {
//         CriarIconInicial(dados.tipo, dados.imagem, dados.nome, dados.artista, "#volte-escutar")
//     })
// }
// else if (pagAtual == "artista.html") {
//     CriarIconInicial(dados.tipo, dados.imagem, dados.nome, dados.artista, "#volte-escutar");
// }


/*
const container = document.querySelector("#volte-escutar");

let player = new Audio();

fetch("../musicas.json")
  .then(res => res.json())
  .then(data => {

    Object.entries(data).forEach(([artista, musicas]) => {

      // 🎤 CARD DO ARTISTA
      const artistaDiv = document.createElement("div");
      artistaDiv.classList.add("icon");

      const imgArtista = document.createElement("img");
      imgArtista.src = musicas[0].arquivoFotoArtista;
      imgArtista.classList.add("capa-artista");

      const nomeArtista = document.createElement("h2");
      nomeArtista.textContent = artista;

      artistaDiv.appendChild(imgArtista);
      artistaDiv.appendChild(nomeArtista);

      container.appendChild(artistaDiv);

      // 🎵 MÚSICAS
      musicas.forEach((musica) => {

        const musicaDiv = document.createElement("div");
        musicaDiv.classList.add("icon");

        const img = document.createElement("img");
        img.src = musica.arquivoCapa;

        const titulo = document.createElement("h2");
        titulo.textContent = musica.titulo;

        const nome = document.createElement("h3");
        nome.textContent = artista;

        musicaDiv.appendChild(img);
        musicaDiv.appendChild(titulo);
        musicaDiv.appendChild(nome);

        // 🔥 AQUI É O SEGREDO (click pra tocar)
        musicaDiv.addEventListener("click", () => {
          player.src = musica.arquivo;
          player.play();
        });

        container.appendChild(musicaDiv);
      });

    });

  });
*/