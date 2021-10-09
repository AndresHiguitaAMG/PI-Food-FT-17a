import { GET_RECIPES, SET_NAME, SET_PAGE, SET_ORDER} from '../actions/index';

const initialState = {
    recipes: [],
    recipe: {},
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
            
            default:
                return state;
            }
        }