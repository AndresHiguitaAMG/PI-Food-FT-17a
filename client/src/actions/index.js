import axios from 'axios';
export const GET_RECIPES = "GET_RECIPES";
export const SET_NAME = "SET_NAME";
export const SET_PAGE = "SET_PAGE"
export const SET_ORDER = "SET_ORDER";
export const GET_RECIPES_BY_ID = "GET_RECIPES_BY_ID";
export const REMOVE_RECIPE = "REMOVE_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPES = "POST_RECIPES";

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

export function getRecipesById(id){
    return async function(dispatch){
        return axios.get(`http://localhost:3001/recipes/${id}`)
        .then(detail => {
            dispatch({
                type: GET_RECIPES_BY_ID,
                payload: detail.data
            })
        })
    }
}

export function removeRecipe(){
    return{
        type: REMOVE_RECIPE,
        payload: {}
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

export function getDiets(){
    return async function(dispatch){
        try{
            var diets = await axios.get(`http://localhost:3001/diets`);
            //("http://localhost:3001/diets",{}); ...
            return dispatch({
                type: GET_DIETS,
                payload: diets.data
            })
        }catch(error){
            console.log(error);
        }
    }
}

export function postRecipes(payload){
    return async function(dispatch){
        try{
            await axios.post(`http://localhost:3001/recipes/create`, payload);
            return dispatch({
                type: POST_RECIPES,
            })
        }catch(error){
            console.log(error);
        }
    }
}





 