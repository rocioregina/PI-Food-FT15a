import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets, getRecipeDetail, setRecipeOrder } from '../../actions/index.js';

import Recipe from "../Recipe/Recipe.js";

export function Recipes(props){
  const [state, setState] = React.useState({
    filter: 'see-all',
    order: 'see-all',
    num: '1'
  })
  const [buttons, setButtons] = React.useState([]);
  const [subArray, setSubArray] = React.useState([]);

  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipesLoaded);

  function orderBy(order){
    console.log(order);
    setState({
      ...state,
      order: order
    })
    dispatch(setRecipeOrder(order));
  }

  function filterBy(filter){
    console.log(filter);
    setState({
      ...state,
      filter: filter
    })
    //dispatch
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

  useEffect(() => { //loads recipes and diets when component mounts
    props.getRecipes();
    props.getDiets();
  }, [])

  useEffect(() => { //gets button quantity
    var array = [];
    var top = Math.ceil(recipes.length/9);
    for(let i=0; i < top; i++){
      array.push(i+1);
    }
    setButtons(array)
  }, [recipes])

  useEffect(() => {
    setSubArray(recipes.slice(9*state.num-9, 9*state.num))
    console.log(recipes)
  }, [recipes, state])

  return (
    <div>
      <div>
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

      <div>
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

      <div>
        {subArray && subArray.map((recipe) =>
        <Link to={`/recipes/${recipe.id}`}>
          <Recipe props={recipe} onClick={() => onClick(recipe.id)}/>
        </Link>
        )}
      </div>

      <div>
        <button name="ant">Prev</button>
        {buttons.map((num) => {return <button name="num" value={num} onClick={(e) => handleInputChange(e)}>{num}</button>})}
        <button name="sig">Next</button>
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
