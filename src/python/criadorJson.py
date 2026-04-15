import os
import json

pasta = "./src/assets/musicas"
artistas = {}
musicas = []

for arquivo in os.listdir(pasta):


    if arquivo.endswith(".mp3") or arquivo.endswith(".m4a"):
        nomeSemExt = arquivo.replace(".mp3", "")
        nomeSemExt = nomeSemExt.replace(".m4a", "")
        
        # separa artista, título e album pelo "-"
        partes = nomeSemExt.split(" - ")
        
        if len(partes) > 1:
            titulo = partes[0].strip()
            artista = partes[1].strip()

            if len(partes) >= 3:
                album = partes[2].strip()
        else:
            artista = "Desconhecido"
            titulo = nomeSemExt
            album = "Desconhecido"
        
        if artista not in artistas:
            artistas[artista] = []

        artistas[artista].append({
                "titulo": titulo,
                "album": album,
                "arquivo": os.path.join(pasta, arquivo),
                "arquivoCapa": f"./src/assets/image/capaAlbuns/{album}.png",
                "arquivoFotoArtista": f"./src/assets/image/fotoArtistas/{artista}.png"
            })

        


# salva o JSON
with open("musicas.json", "w", encoding="utf-8") as f:
    json.dump(artistas, f, indent=4, ensure_ascii=False)

print("gerado")