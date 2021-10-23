import { 
    GET_RECIPES, 
    SET_NAME, 
    SET_PAGE, 
    SET_ORDER, 
    GET_RECIPES_BY_ID, 
    REMOVE_RECIPE, 
    GET_DIETS,
    FILTER_BY_DIET,
    ORDER_BY_SCORE
} from '../actions/index';

const initialState = {
    recipes: {result: []},
    recipe: [],
    diets: [],
    diet: "",
    name: "",
    order: "",
    page: 1
}

export default function reducer(state = initialState, { type, payload }){
    switch (type) {
        case GET_RECIPES:
            return{
                ...state,
                recipes:{
                    result: payload.result
                } 
            }

            case GET_RECIPES_BY_ID:
                return{
                    ...state,
                    recipe: payload
                }
            
                
            case SET_NAME:
            return{
                ...state,
                name: payload
            }

            case SET_PAGE:
            return{
                ...state,
                page: payload
            }

            case SET_ORDER:
                return{
                    ...state,
                    order: payload
                }

                case REMOVE_RECIPE:
                    return{
                        ...state,
                        recipe: payload
                    }
                
                case GET_DIETS:
                    return{
                        ...state,
                        diets: payload
                    }  

                    case FILTER_BY_DIET:
                        const data = state.recipes.result.filter(el =>{
                            return el.diets === payload
                        })
                        return{
                            ...state,
                            recipes:{
                                result: data
                            }
                        }

                    case ORDER_BY_SCORE:
                        if(payload === "asc"){
                            const ordenamiento = state.recipes.result.sort((a, b) =>{
                                return a.score - b.score;
                            })
                            return{
                                ...state,
                                recipes: {
                                    result: ordenamiento 
                            }
                    

                        }
                    }
                        if(payload === "desc"){
                            const ordenamiento = state.recipes.result.sort((a, b) =>{
                                return b.score - a.score;
                            })
                            return{
                                ...state,
                                recipes: {
                                    result: ordenamiento 
                            }
                        }
                    }
                    return state
                       
            default:
                return state; 
            }
        }