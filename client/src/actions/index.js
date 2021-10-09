import axios from 'axios';
export const GET_RECIPES = "GET_RECIPES";
export const SET_NAME = "SET_NAME";
export const SET_PAGE = "SET_PAGE"
export const SET_ORDER = "SET_ORDER";

export function getRecipes({name, order, page}){
    return async function(dispatch){
        try{
            var allData = await axios.get(`http://localhost:3001/recipes?page=${page ? page : 1}&order=${order ? order : ""}&name=${name ? name : ""}`);
            return dispatch({
                type: GET_RECIPES,
                payload: allData.data
            })
        }catch(err){
            console.log(err);
        }
    } 
}

export function setName(name){
    return{
        type: SET_NAME,
        payload: name
    }
}

export function setPage(page){
    return{
        type: SET_PAGE,
        payload: page
    }
}

export function setOrder(order){
    return{
        type: SET_ORDER,
        payload: order
    }
}



 