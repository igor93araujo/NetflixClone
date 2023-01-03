/* eslint-disable default-case */
const API_KEY = "e7643c02f8213c1cff27e4ca28583722";
const API_BASE = "https://api.themoviedb.org/3";

// Primeiro estamos criando as listas de filmes:
// segundo fazemos a função que fará o fetch para pegar informações dos itens. 

const basicFetch =  async (endpoint) => {
  const response = await fetch (`${API_BASE}${endpoint} `);
  const data = await response.json();
  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`) // dado encontrado na doc da API;
      },
      {
        slug: 'tranding',
        title: 'Recomendados para Você',
        items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
      },
    ];
  },

  getMovieInfo: async(movieId, type) => { //função para pegar informações de 1 filme específico e usar lá no banner de cima.
    let info = {};

    if (movieId){
      switch(type) {
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
          break;
          default:
            info = null;
          break;
      }
    }
    return info;
  }

}
