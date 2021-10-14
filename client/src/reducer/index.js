import { 
    GET_RECIPES, 
    SET_NAME, 
    SET_PAGE, SET_ORDER, 
    GET_RECIPES_BY_ID, 
    REMOVE_RECIPE, 
    GET_DIETS,
    // POST_RECIPES
} from '../actions/index';

const initialState = {
    recipes: [],
    recipe: [],
    diets: [],
    name: "",
    order: "",
    page: 1
}

export default function reducer(state = initialState, { type, payload }){
    switch (type) {
        case GET_RECIPES:
            return{
                ...state,
                recipes: payload
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
                
                // case POST_RECIPES:
                //     return{
                //         ...state
                //     }
            
            default:
                return state;
            }
        }