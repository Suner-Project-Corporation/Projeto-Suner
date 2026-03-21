// correção para largura da sub-main
function MudarTamanhoPag() {
    larguraBarraLateral = document.querySelector('.barra-lateral').clientWidth;
    larguraMonitor = document.querySelector('body').clientWidth;
    larguraSubMain = larguraMonitor - larguraBarraLateral - 10;
    document.documentElement.style.setProperty('--LarguraSubMain', `${larguraSubMain}px`);
    console.log(larguraBarraLateral, larguraMonitor, larguraSubMain);
}

MudarTamanhoPag()
window.addEventListener('resize', () => {
    MudarTamanhoPag();
});

// define os elementos
barraUser = document.getElementById("barra-user");
mostra = document.getElementById("barra-user").classList;

// controla a visiblidade da barra do usuário
function visibilidadeBarraUser() {
    if (mostra == "hide") {
        barraUser.classList.remove("hide");
        console.log("tu clicou");
    }
    else {
        barraUser.classList.add("hide");
        console.log("tu clicou");
    }

}

// esses cabas abaixo é para definir quem fecha e abre o bglh da barra do user

fotoPerfil = document.querySelector(".foto-perfil");
fotoPerfil.addEventListener('click', visibilidadeBarraUser);

btnFechar = document.getElementById("btn-fechar");
btnFechar.addEventListener('click', visibilidadeBarraUser)

// abaixo segue o código para mudar a cor do site
function mudarCorSite() {
    CorTema = document.getElementById("input-tema").value;
    CorBG = document.getElementById("input-bg").value;
    document.documentElement.style.setProperty('--CorTema', CorTema);
    document.documentElement.style.setProperty('--CorFundo', CorBG);
}

btnMudarCor = document.getElementById("btn-mudar-cor");
btnMudarCor.addEventListener('click', mudarCorSite);