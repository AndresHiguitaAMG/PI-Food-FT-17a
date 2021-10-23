import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { getRecipesById, removeRecipe } from '../../actions';
import "../Home/Home.css"

function Detail(props) {
    
    const { id } = props.match.params
    const { recipe } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(getRecipesById(id))
        return()=>{
            dispatch(removeRecipe())
        }
    },[dispatch,id])

const goToBack = ()=>{
    history.goBack()
}

    return (
        <div>
            <button onClick={goToBack}>◀</button>
            {

                recipe?.name ? 
                <>
                <div className="recipes">
                
                <div><img src={recipe.image} alt="img not found" width="400px" heigth="290px"/></div>
                   <div>
                    <p>{recipe.dishTypes}</p>
                    {/* <p>{recipe.diets}</p>  */}
                    <p dangerouslySetInnerHTML={{__html: recipe.summary,}}/>
                    <p>{recipe.score}</p>
                    <p>{recipe.healthScore}</p>
                    <p>{recipe.instructions}</p>
                    </div>
                    </div>
                </>
                :
                <div>Cargando...</div>
            }
        </div>
    )
}

export default Detail
