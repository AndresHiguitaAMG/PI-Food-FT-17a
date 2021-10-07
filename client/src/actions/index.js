import axios from 'axios';
export const GET_RECIPES = "GET_RECIPES";

export function getRecipes({name, order, page}){
    return async function(dispatch){
        try{
            var allData = await axios.get(`http://localhost:3001/recipes?page=${page ? page : 1}& order=${order ? order : ""}& name=${name ? name : "" }`);
            return dispatch({
                type: GET_RECIPES,
                payload: allData.data
            })
        }catch(err){
            console.log(err);
        }
    } 
}