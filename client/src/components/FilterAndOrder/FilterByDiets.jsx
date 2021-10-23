import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet, getRecipes } from '../../actions';
import './FilterByDiets.css';

function FilterByDiets() {
    const dispatch = useDispatch();
    const { recipes, page } = useSelector(state => state);

    const handleByDiets = (e) =>{
        dispatch(filterByDiet(e.target.value))
        dispatch(getRecipes({recipes, name: e.target.value, page})) 
    }

    return (
        <div>
            <span>Filter By Diet: </span>
            <select className='filter-select' onChange={(e) => handleByDiets(e)}>
                <option value=''> -- Select --</option>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
               <option value="Primal">Primal</option>
               <option value="Whole 30">Whole 30</option>
           </select>
        </div>
    )
}



export default FilterByDiets
