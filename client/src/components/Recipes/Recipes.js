import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets, getRecipeDetail, setRecipeOrder, setRecipeFilter, addFavorite } from '../../actions/index.js';

import Recipe from "../Recipe/Recipe.js";
import './Recipes.css';

export function Recipes(props){
  const [state, setState] = React.useState({
    filter: 'see-all',
    order: 'see-all',
    num: '1'
  })
  const [buttons, setButtons] = React.useState([]);
  const [subArray, setSubArray] = React.useState([]);

  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipesRender);

  function orderBy(order){ //dispatches an action that sorts recipes from the global state
    console.log(order);
    setState({
      ...state,
      order: order
    })
    dispatch(setRecipeOrder(order));
  }
  //Vegetarian --> vegetarian
  function filterBy(filter){  //dispatches an action that filters recipes from the global state
    var filterLower = filter.toLowerCase().replaceAll('_', ' ') //could use split + join since it's not a critic performance case
    console.log(filter);
    console.log(filterLower);
    setState({
      ...state,
      filter: filter
    })
    dispatch(setRecipeFilter(filterLower));
  }

  function handleInputChange(e){
    setState({
      ...state,
      [e.target.name] : e.target.value
    });
  }

  function onClick(id){
    dispatch(getRecipeDetail(id));
  }

  function setFavorite(recipe){
    dispatch(addFavorite(recipe));
    alert("Favorite added!");
  }

  useEffect(() => { //loads recipes and diets when component mounts
    props.getRecipes();
    props.getDiets();
  }, [])

  useEffect(() => { //gets numeric button quantity
    var array = [];
    var top = Math.ceil(recipes.length/9);
    for(let i=0; i < top; i++){
      array.push(i+1);
    }
    setButtons(array)
  }, [recipes])

  useEffect(() => { //filters a subArray to be rendered depending on the numeric button selected
    setSubArray(recipes.slice(9*state.num-9, 9*state.num))
    // console.log(recipes)
  }, [recipes, state])

  return (
    <div className='all'>
      <div className='selectors'>
        <div className='filter'>
          <span>Filter by:</span>
          <select
            name="filter"
            defaultValue="see-all"
            value={state.filter}
            onChange={(e) => filterBy(e.target.value)}>
            {props.diets.map((diet) =>
              {return <option value={diet.name}>{diet.name}</option>}
            )}
          </select>
        </div>

        <div className='order'>
          <span>Order by:</span>
          <select name="order"
              value={state.order} onChange={(e) => orderBy(e.target.value)}>
            <option value="see-all">See all</option>
            <option value="score-asc">Lowest Score</option>
            <option value="score-desc">Higher Score</option>
            <option value="alph-asc">A-Z</option>
            <option value="alph-desc">Z-A</option>
          </select>
        </div>
      </div>

      <div className='recipes'>
        {subArray.length!==0 ? subArray.map((recipe) =>
        <div className='recipe-box'>
          <Link to={`/recipes/${recipe.id}`}>
            <Recipe props={recipe} onClick={() => onClick(recipe.id)}/>
          </Link>
          <button onClick={() => setFavorite(recipe)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="star-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      ) : <p>Recipes not found.</p>}
      </div>

      <div className='paginate'>
          {buttons.map((num) => {return <button className='button' name="num" value={num} onClick={(e) => handleInputChange(e)}>{num}</button>})}
      </div>
    </div>
  )
}

//receiving loaded recipes from state
function mapStateToProps(state) {
  return {
    recipes: state.recipesLoaded,
    diets: state.dietsLoaded
  }
}
function mapDispatchToProps(dispatch){
  return {
    getRecipes: () => dispatch(getRecipes()),
    getDiets: () => dispatch(getDiets()),
    getRecipeDetail: () => dispatch(getRecipeDetail())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
