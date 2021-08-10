import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getRecipes, getDiets } from '../../actions/index.js';

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
  useEffect(() => { //loads recipes and diets when component mounts
    props.getRecipes();
    props.getDiets();
  }, [])

  useEffect(() => { //gets button quantity
    var array = [];
    var top = Math.ceil(props.recipes.length/9);
    for(let i=0; i < top; i++){
      array.push(i+1);
    }
    setButtons(array)
  }, [props.recipes])

  useEffect(() => { //gets a subarray of recipes depending on the numeric button selected
    setSubArray(props.recipes.slice(9*state.num-9, 9*state.num))
  }, [state.num, props.recipes])

  useEffect(() => { //sorts recipes by order value
    if(state.order === "alph-asc"){ //to complete
      props.recipes = props.recipes.sort(function (a, b) {
        return a.title.localCompare(b.title) ? 1 : -1
      })
    }
  }, [state.order])

  function handleInputChange(e){
    setState({
      ...state,
      [e.target.name] : e.target.value
    });
  }

  return (
    <div>
      <div>
        <span>Filter by:</span>
        <select
          name="filter"
          defaultValue="see-all"
          value={state.filter}
          onChange={(e) => handleInputChange(e)}>
          {props.diets.map((diet) =>
            {return <option value={diet.name}>{diet.name}</option>}
          )}
        </select>
      </div>

      <div>
        <span>Order by:</span>
        <select name="order" defaultValue="see-all"
            value={state.order} onChange={(e) => handleInputChange(e)}>
          <option value="see-all">See all</option>
          <option value="score-asc">Score(asc)</option>
          <option value="score-desc">Score(desc)</option>
          <option value="alph-asc">Alphabetical(asc)</option>
          <option value="alph-desc">Alphabetical(desc)</option>
        </select>
      </div>

      <div>
        {subArray && subArray.map((recipe) =>
        <Link to={`/recipes/${recipe.id}`}>
          <Recipe props={recipe}/>
        </Link>
        )}
      </div>

      <div>
        {buttons.map((num) => {return <button name="num" value={num} onClick={(e) => handleInputChange(e)}>{num}</button>})}
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
    getDiets: () => dispatch(getDiets())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
