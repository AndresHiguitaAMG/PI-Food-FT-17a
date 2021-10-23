import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getRecipes, setPage } from '../../actions';
import Card from '../Card/Card';
import Search from '../Searc/Search';
import Order from '../Order/Order';
import './Home.css';
import FilterByDiets  from '../FilterAndOrder/FilterByDiets';
import OrderByScore from '../FilterAndOrder/OrderByScore';

const Home = () => {
    const dispatch = useDispatch();
    const { recipes, name, order, page } = useSelector(state => state);

    useEffect(() =>{
        dispatch(getRecipes({}))
    }, [dispatch])

    console.log(recipes.result);

    const handleClickPage = (page) =>{
            dispatch(getRecipes({ page, name, order }))
            dispatch(setPage(page))
    }
    const handleonClickLoad = (e) =>{
        e.preventDefault(); //Evita que se recargue la pagina y se rompa
        dispatch(getRecipes({ page, name }))
        dispatch(setPage(page))
    }

    return (

        <div>
            
            <button onClick={(e) => handleonClickLoad(e)}>Load recipes</button>

            <div className="recipes">
            <OrderByScore />

            <FilterByDiets />

<           Search />

            <Order />
            </div>
            
            
            <div className="recipes"> 
            {recipes?.result?.length > 0 ? 
            
                
                recipes?.result?.length > 0 && recipes.result.map((e) =>{
                    return <Card image={e.image} name={e.name} diets={e.diets} id={e.id} key={e.id}/>
                })
                : 
                <div>Cargando...</div>
            }
            </div>
            
            <button disabled={page - 1 === 0} onClick={() =>{handleClickPage(page - 1)}}>Back</button>
            <label>{page}</label>
            <button disabled={recipes?.count <= (page * 9)} onClick={() =>{handleClickPage(page + 1)}}>Next</button>
        </div>
    );
}
 
export default Home;