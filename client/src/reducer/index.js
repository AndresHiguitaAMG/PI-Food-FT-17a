import { GET_RECIPES } from '../actions/index';

const initialState = {
    recipes: [],
    recipe: {},
    diets: []
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
            default:
                return state;
            }
        }