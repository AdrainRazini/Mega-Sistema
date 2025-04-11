async function carregarAnimes() {
  try {
    const resposta = await fetch('https://api.jikan.moe/v4/top/anime');
    if (!resposta.ok) throw new Error('Erro ao buscar dados');
    const url = 'https://animesonlinecc.to/'
    const dados = await resposta.json();
    const lista = document.getElementById('anime-list');
    lista.innerHTML = ''; // Limpar a lista antes de adicionar novos animes

    dados.data.forEach(anime => {
      const card = document.createElement('div');
      card.className = 'anime-card';

      // Criando os elementos de forma segura
      const imagem = document.createElement('img');
      imagem.src = anime.images.jpg.image_url;
      imagem.alt = anime.title;

      const titulo = document.createElement('h3');
      titulo.textContent = anime.title;

      const nota = document.createElement('p');
      nota.innerHTML = `<strong>Nota:</strong> ${anime.score ?? 'N/A'}`;

      const sinopse = document.createElement('p');
      sinopse.textContent = anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'Sem sinopse disponível.';

      // Criando os botões
      const botaoAssistir = document.createElement('a');
      botaoAssistir.href = `${url}?s=${encodeURIComponent(anime.title)}`;
      botaoAssistir.target = '_blank';
      const buttonAssistir = document.createElement('button');
      buttonAssistir.textContent = '▶️ Assistir no AnimesOnline';
      botaoAssistir.appendChild(buttonAssistir);

      const botaoMyAnimeList = document.createElement('a');
      botaoMyAnimeList.href = anime.url;
      botaoMyAnimeList.target = '_blank';
      const buttonMyAnimeList = document.createElement('button');
      buttonMyAnimeList.textContent = '🔎 Ver no MyAnimeList';
      botaoMyAnimeList.appendChild(buttonMyAnimeList);

      // Adicionando os elementos ao card
      card.appendChild(imagem);
      card.appendChild(titulo);
      card.appendChild(nota);
      card.appendChild(sinopse);
      card.appendChild(botaoAssistir);
      card.appendChild(botaoMyAnimeList);

      // Adicionando o card à lista
      lista.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao carregar animes:', error);
    const lista = document.getElementById('anime-list');
    const erroElemento = document.createElement('p');
    erroElemento.textContent = 'Não foi possível carregar os animes no momento. Tente novamente mais tarde.';
    lista.appendChild(erroElemento);
  }
}

carregarAnimes();
