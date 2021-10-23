import {React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipes } from '../../actions';
import { useHistory } from 'react-router-dom';

function validate(input){
    let error = {};
    if(!input.name){ //Si no hay nada
        error.name = "Name required" //Respondo con esto
    }else if(!input.summary){
        error.summary = "Summary must be completed";
    }
    if(!input.score){
        error.score = "A number is required";
    }else if(!input.healthScore){
        error.healthScore = "A number is required";
    }if(!input.instructions){
        error.instructions = "A text is required";
    }
    return error;
}

function Form() {
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    const history = useHistory();
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        name: "", 
        summary: "", 
        score: "", 
        healthScore: "", 
        instructions: "", 
        diets: []
    })
    
    useEffect(() =>{
        dispatch(getDiets()) //Cuando el componente se monta despacho la acción de dietas
    }, [dispatch])

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        dispatch(postRecipes(input))
        alert("Successfully created recipe")
        setInput({
            name: "", 
            summary: "", 
            score: "", 
            healthScore: "", 
            instructions: "", 
            diets: []
        })
        history.push('/home')
    }

    const handleOnChange = (e) =>{
        //Seteo el input
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = (e) =>{
        const select = input.diets.find(el => el === e.target.value)
        if(select) return 
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    // const handleDelete = (e) =>{
    //     setInput({
    //         ...input,
    //         diets: input.diets.filter(el => el !== e)
    //     })
    // }

    

     return (
     <div>
         <h1>Create a recipe</h1>
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <div>
            <label>Name:</label>
            <input 
            type="text" 
            value={input.name} 
            name="name" 
            onChange={(e) => handleOnChange(e)} 
            />
            {error.name && ( //Si esta mi estado error
                <p>{error.name}</p> //Rendiriza esto
            )
            }
            </div>

            <div>
            <label>Summary:</label>
            <input 
            type="text" 
            value={input.summary} 
            name="summary" 
            onChange={(e) => handleOnChange(e)} 
            />
            {error.summary && (
                <p>{error.summary}</p>
                )
            }
            </div>

            <div>
            <label>Score:</label>
            <input 
            type="number" 
            value={input.score} 
            name="score" 
            onChange={(e) => handleOnChange(e)} 
            />
            {error.score && (
                <p>{error.score}</p>
                )
            }
            </div>

            <div>
            <label>HealthScore:</label>
            <input 
            type="number" 
            value={input.healthScore} 
            name="healthScore" 
            onChange={(e) => handleOnChange(e)} 
            />
            {error.healthScore && (
                <p>{error.healthScore}</p>
                )
            }
            </div>

            <div>
            <label>Instructions:</label>
            <input 
            type="text" 
            value={input.instructions} 
            name="instructions" 
            onChange={(e) => handleOnChange(e)} 
            />
             {error.instructions && (
                <p>{error.instructions}</p>
                )
            }
            </div>

            <select onChange={(e) => handleSelect(e)}>
            <option value=''> -- Select diet --</option>
            {diets.map(el => ( 
                        <option value={el}>{el}</option>
                    ))}
            </select>
            
            <ul>
                <li>{input.diets.map(el => el + ",")}</li>
            </ul>

            <button type="submit">Create</button>
        </form>
        {/* {
        input.diets.map(e =>
        <div className="divOcc">
            <p>{e}</p>
            <button className="buttonX" onClick={() => handleDelete(e)}>X</button>
            </div>
            )}  */}
        </div>
    )
}

export default Form
