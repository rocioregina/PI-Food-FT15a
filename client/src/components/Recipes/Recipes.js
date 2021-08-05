import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Recipe from "../Recipe/Recipe.js";

export function Recipes(props){

  return (
    <div>
      //mapping multiple recipe components
      {props.recipes.map((recipe) =>
        <Link to={`/recipes/${recipe.id}`}>
          <Recipe title={recipe.title}/>
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

export default connect(mapStateToProps)(Recipes);
