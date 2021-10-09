import React from 'react'

const Card = ({image, name, diets}) => {
    return (
        <div>
            <img src={image} alt="img not found" width="200px" heigth="250px"/>
            <h2>{name}</h2>
            <h3>{diets}</h3>
        </div>
    );
}
 
export default Card;