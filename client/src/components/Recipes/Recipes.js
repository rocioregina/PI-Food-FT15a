import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getRecipes } from '../../actions/index.js';

import Recipe from "../Recipe/Recipe.js";

export function Recipes(props){
  console.log(props);
  const dispatch = useDispatch();
  useEffect(() => {
    props.getRecipes();
  }, [])
  //props.getRecipes();
  console.log(props.recipes[0]);
  return (
    <div>
      {props.recipes && props.recipes.map((recipe) =>
        <Link to={`/recipes/${recipe.id}`}>
          <Recipe props={recipe}/>
        </Link>
      )}
    </div>
  )
}

//receiving loaded recipes from state
function mapStateToProps(state) {
  return {
    recipes: state.recipesLoaded
  }
}
function mapDispatchToProps(dispatch){
  return {
    getRecipes: () => dispatch(getRecipes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
