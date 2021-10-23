import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Card"

const Card = ({image, name, diets, id}) => {
    // const getDiets = function () {
	// 	let arrayDiets = [];
	// 	if (diets) { //
	// 		for(let diet of diets) {
	// 			typeof diet === 'object' ? arrayDiets.push(diet.name) : arrayDiets.push(diet);
	// 		}
	// 	}
	// 	return arrayDiets.length && arrayDiets.join(", ");
	// }

    return (
        <div  className='card'>

            <div className='img-recipe' >
            <img src={image} alt="img not found" />
            </div>

            <div className='card-info'>
            <NavLink to={`/detail/${id}`}>
                {name}
            
            </NavLink>
            <h3 className='card-diets'>{diets}</h3>
            </div>
        </div>
    );
}
 
export default Card;