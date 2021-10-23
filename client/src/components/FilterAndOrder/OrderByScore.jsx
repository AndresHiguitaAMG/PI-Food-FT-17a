import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByScore } from '../../actions';

const OrderByScore = () => {
    const dispatch = useDispatch();

    const handleChangeSelect = (e) =>{
        dispatch(orderByScore(e.target.value))
    }


    return (
        <div>
            <span>Order By Score: </span>
            <select onChange={handleChangeSelect}>
                <option selected value=''> -- Select --</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
        </div>
    );
}
 
export default OrderByScore;