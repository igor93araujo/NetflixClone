/* eslint-disable import/no-anonymous-default-export */
import React, {useEffect, useState} from 'react';
import './App.css'
import Tmbd from './Tmbd';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

export default () => {

    //useState serve para salvar as informaçãoes e inicia com um array vazio; 

    const [movieList, setMovieList] = useState([]);

    //State apenas para verificar se na lista tem o filme para aparecer no destaque:
    const [featuredData, setFeaturedData] = useState(null); //vamos preencher o featuredData com dados que queremos mosrtar

    //useEffect é uma função que executa o que tem dentro dela quando a tela é carregada. 

    let [blackHeader, setBlackHeadder ] = useState(false);
  
    useEffect(()=> {
      const loadAll =  async () => {
        //Pegando a lista total:
        const list = await Tmbd.getHomeList();
        setMovieList(list)

        //pegando o featured de maneira aleatrória
        const originals = list.filter(i=>i.slug === 'originals'); //pega apenas os itens que tem esse slug
        const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length-1));
        const chosen = originals[0].items.results[randomChosen];
        const chosenInfo = await Tmbd.getMovieInfo(chosen.id, 'tv');
        setFeaturedData(chosenInfo);
      }
      loadAll();
    }, []);

    useEffect(()=>{
      const scrollListener = () => {
          if(window.scrollY > 10) {
            setBlackHeadder(true)
          } else {
            setBlackHeadder(false);
          }
      }
      window.addEventListener('scroll', scrollListener);

      return () => {
        window.removeEventListener('scroll', scrollListener) //remove o evento quando sai a pagina. 
      }
    }, [])
    
    return (
      <div className="page">
        <Header black={blackHeader  } />
        {featuredData && //qndo ele existir roda o componente e manda os dados
          <FeatureMovie item={featuredData} />
        }

        <section className='lists'>
          {
            movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/> //Passando duas props
            ))
          }
        </section>
        <footer>
          Feito com <span role='img' aria-label='coração'> ❤️ </span> por Igor Barbosa seguindo os passos da B7Web.<br/>
          Direitos de imagem para Netflix. <br/>
          Dados pegos do site <a href='https://themoviedb.org'>themoviedb.org</a>;
        </footer>
        {
          movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando' />
        </div>
        }
      </div>
    );
  }

