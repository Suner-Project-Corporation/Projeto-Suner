from tinytag import TinyTag
from mutagen.id3 import ID3
import os
pastaMusica = "./src/assets/audio/musicas/"
listaMusica = os.listdir(pastaMusica)

def extrairCapa(musica, nome):
    audio = ID3(musica)
    imagens = audio.getall("APIC")
    if imagens:
        dadosImg = imagens[0].data
        with open(f"./src/assets/image/musicas/{nome}.jpg", "wb") as f:
            f.write(dadosImg)

def extrairMetadados():
    listDados = []
    for arquivo in listaMusica:
        caminhoMusica = os.path.join(pastaMusica, arquivo)
        tag = TinyTag.get(caminhoMusica)
        extrairCapa(caminhoMusica, tag.title)
        listDados.append([{"tipo":"musica", "nome":tag.title,"artista":tag.artist}])
    return listDados


print(extrairMetadados())