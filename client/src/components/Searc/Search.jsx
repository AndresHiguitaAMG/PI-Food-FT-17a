import { React, useState }from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, setName, setPage, } from '../../actions';

function Search() {
    const [input, setInput] = useState(""); //Input tiene el valor a mostrar
    const dispatch = useDispatch();
    
    
    //Modifico el input 
    const handleOnChange = (e) =>{
        e.preventDefault()
        setInput(e.target.value)
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(setName(input)) //Guarda el input en el store
        dispatch(getRecipes({page: 1, name: input})) //Y aquí hago la consulta como tal, pasandole el name y el input
        dispatch(setPage(1)) //Ya hice mi busqueda pero ahora seteo la pagina en 1
        setInput("")
    }

    // const handleByDiets = (e) =>{
    //     dispatch(getRecipes(e.target.value))
    //     dispatch(setRecipe(e.target.value))
    //     console.log(e.target.value);
    // }
    
    return (
        <form >
            {/* <select onChange={(e) => handleDietSelect(e)}>
                <option value="All">All</option>
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
            </select> */}

            <input
            type="text"
            placeholder="Search"
            onChange={handleOnChange}
            value={input}
            />
            <button
            type="submit"
            onClick={onSubmit}
            >🔍</button>
        </form>
    )
}

export default Search;
