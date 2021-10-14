import React from 'react';
import { NavLink } from 'react-router-dom';

const Card = ({image, name, diets, id}) => {
    const getDiets = function () {
		let arrayDiets = [];
		if (diets) { //
			for(let diet of diets) {
				typeof diet === 'object' ? arrayDiets.push(diet.name) : arrayDiets.push(diet);
			}
		}
		return arrayDiets.length && arrayDiets.join(", ");
	}

    return (
        <div>
            <img src={image} alt="img not found" width="200px" heigth="250px"/>
            <NavLink to={`/detail/${id}`}>{name}</NavLink>
            <h3>{getDiets()}</h3>
        </div>
    );
}
 
export default Card;