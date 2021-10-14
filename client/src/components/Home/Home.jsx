import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getRecipes, setPage } from '../../actions';
import Card from '../Card/Card';
import Search from '../Searc/Search';
import Order from '../Order/Order';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const { recipes, name, order, page } = useSelector(state => state);

    useEffect(() =>{
        dispatch(getRecipes({}))
    }, [dispatch])

    const handleClickPage = (page) =>{
            dispatch(getRecipes({ page, name, order }))
            dispatch(setPage(page))
    }

    return (
        <div>
            
            <Search />

            <Order />
            
            {
                
                recipes?.result?.length > 0 && recipes.result.map((e) =>{
                    return <Card image={e.image} name={e.name} diets={e.diets} id={e.id} key={e.id}/>
                })
            }

            <button disabled={page - 1 === 0} onClick={() =>{handleClickPage(page - 1)}}>Back</button>
            <label>{page}</label>
            <button disabled={recipes?.count <= (page * 9)} onClick={() =>{handleClickPage(page + 1)}}>Next</button>
        </div>
    );
}
 
export default Home;