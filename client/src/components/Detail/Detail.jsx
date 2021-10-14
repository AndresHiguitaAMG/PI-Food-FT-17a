import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { getRecipesById, removeRecipe } from '../../actions';

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
                    <img src={recipe.image} alt="img not found" width="400px" heigth="290px"/>
                    <p>{recipe.name}</p>
                    <p>{recipe.dishTypes}</p>
                    {/* <p>{recipe.diets}</p>  */}
                    <p dangerouslySetInnerHTML={{__html: recipe.summary,}}/>
                    <p>{recipe.healthScore}</p>
                    <p>{recipe.instructions}</p>
                </>
                :
                <div>Cargando...</div>
            }
        </div>
    )
}

export default Detail
