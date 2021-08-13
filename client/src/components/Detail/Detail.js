import React from "react";

import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeDetail } from "../../actions/index.js";
// import DetailedRecipe from "../DetailedRecipe/DetailedRecipe.js";

export default function Detail(props){
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetail);
  // const matchRecipe = useRef(match.params.id);

  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id));
  }, [])

  useEffect(() => {
    document.querySelector("#summary").innerHTML = recipe.summary
    console.log(recipe.diets)
  }, [recipe])

  return (
    <div>
      <h4>{recipe.title}</h4>
      <img src={recipe.image}/>
      <p id='summary'></p>
      <h2>{recipe.spoonacularScore}</h2>
      <h2>{recipe.healthScore}</h2>
      {recipe.diets.length!==0 && recipe.diets.map((diet) => {
        console.log(diet)
        return <p>{diet}</p>
      })}
    </div>
  )
}
