// 15)

import React from 'react';
import {Link} from 'react-router-dom';
import '../EstilosCss/Carta.css';

function Card({data}) { // acá recibo ya la info mapeada de todos los videogamea mostrar
	return (
		<div className='card'>
			{/* Acá permito que al tocar la carta, pueda entrar al detalle */}
			<Link to={`/videogames/${data.id}`}> 
			{/* En el caso de no haber imagen, muestro la siguiente foto */}
				{data.image === null || !data.image ? (
					<img className = "img" src="https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1" alt="Link caido"/>
				) : ( // sino muestro la imagen que me llega 
					<img className='img' src={data.image} alt={data.name} />
				)}
			</Link>
			<div className='textCard'>
				<div className='nameGenres'>
					{/* Renderizo toda la info, que quiero mostrar: */}
					<div className='name'>{data.name}</div>
					<div className='genres'>{data.genres}</div>
				</div>
				
			</div>
			<div className='divRating'>
					<div className='rating'>{data.rating}</div>
				</div>
		</div>
	);
}

export default Card;

