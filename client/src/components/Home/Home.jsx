import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getRecipes } from '../../actions';
import Card from '../Card/Card';

const Home = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const [page, setPage] = useState(1);
    useEffect(() =>{
        dispatch(getRecipes({}))
    }, [dispatch])

    const handleClickPage = (page) =>{
            dispatch(getRecipes({page}))
            setPage(page)
    }

    return (
        <div>
            {
                recipes?.result?.length > 0 && recipes.result.map((e) =>{
                    return <Card image={e.image} title={e.title} diets={e.diets} key={e.id}/>
                })
            }

            <button disabled={page -1 === 0} onClick={() =>{handleClickPage(page - 1)}}>Back</button>
            <label>{page}</label>
            <button disabled={recipes?.count <= (page * 9)} onClick={() =>{handleClickPage(page + 1)}}>Next</button>


            {/* <button disabled={page -1 === 0} onClick={()=> {handleClickPage(page - 1)}}>previous</button>
                    <label>{page}</label>
                <button disabled={recipes?.count <= (page * 9)} onClick={()=>{handleClickPage(page + 1)}}>next</button> */}
        </div>
    );
}
 
export default Home;