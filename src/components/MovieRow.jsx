/* eslint-disable import/no-anonymous-default-export */
import React, {useState}from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default ({title, items }) => { //recendo as pros de app

    let [scrollX, setScrollX] = useState(-400);

    const handleLeftArrow = () => {
      let newScrollValue = scrollX + (Math.round(window.innerWidth / 2)); // a cada click ele adc um num baseado no tamanho da tela do dispositivo, dividido por 2 (metade da tela)

      if (newScrollValue > 0) { // se clicar e passar de zero, ele volta pra zero
        newScrollValue = 0;
      } 
      setScrollX(newScrollValue);
    }

    const handleRightArrow = () => {
      let newScrollValue = scrollX - (Math.round(window.innerWidth / 2)); 
      let listW = items.results.length * 150; // largura da lista 

      if ((window.innerWidth - listW) > newScrollValue) {
        newScrollValue = (window.innerWidth - items.results.length * 150) - 60;
      }
      setScrollX(newScrollValue);
    }

  return (
    <div className='movieRow'>
      <h2>{title}</h2>
      <div className='movieRow--left' onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}} />
      </div>
      <div className='movieRow--right' onClick={handleRightArrow}>
        <NavigateNextIcon style={{fontSize: 50}} />
      </div>
      <div className='movieRow--listarea'>
        <div className='movieRow--list' style={
          {
            marginLeft: scrollX,
            width: items.results.length * 150 //a qtd de filmes na lista vezes a largura de cada filme será a largura do row.
          }
        }>
        {items.results.length > 0 && items.results.map((item, key)=>(
          <div className='movieRow--item' key={key}>
            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}