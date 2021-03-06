import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, setOrder } from '../../actions';

function Order() {
    const { name, page } = useSelector(state => state)
    const dispatch = useDispatch();

    const HandleChangeSelect = (e) =>{
        dispatch(setOrder(e.target.value))
        dispatch(getRecipes({name, page, order: e.target.value})) 
    }
    return (
        <div>
            <span>Order By Name: </span>
            <select onChange={HandleChangeSelect}>
                <option selected value=''> -- Select --</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
        </div>
    )
}

export default Order
