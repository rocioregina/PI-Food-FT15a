import React from "react";

import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeDetail } from "../../actions/index.js";
import './Detail.css';
// import DetailedRecipe from "../DetailedRecipe/DetailedRecipe.js";

export default function Detail(props){
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetail);
  const [diets, setDiets] = React.useState([]);
  // const matchRecipe = useRef(match.params.id);

  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id));
  }, [])

  useEffect(() => {
    document.querySelector("#summary").innerHTML = recipe.summary;
  }, [recipe, diets])

  console.log('hola');
  return (
    <div className='detail'>
      <div className='title-box'>
        <div className='title'>
          <h4>{recipe.title}</h4>
        </div>
        <div className='score-box'>
          <div className='score'>
            <h2>{recipe.spoonacularScore}</h2>
            <p>Spoon Score</p>
          </div>
          <div className='score'>
            <h2>{recipe.healthScore}</h2>
            <p>Health Score</p>
          </div>
        </div>
      </div>
      <div className='body'>
        <div className='image-box'>
          <img src={recipe.image}/>
        </div>
        <div className='details-box'>
          <div className='summary-box'>
            <p id='summary'></p>
          </div>
        </div>
      </div>
      <div className='categories'>
        <div className='type-box'>
          <span>Diets:</span>
          {recipe.diets ? recipe.diets.map((diet) => {
            console.log(diet)
            return <span>{diet}</span>
          }) : []}
        </div>
        <div className='type-box'>
          <span>Dish types:</span>
          {recipe.dishTypes ? recipe.dishTypes.map((dish) => {
            console.log(dish)
            return <span>{dish}</span>
          }) : []}
        </div>
      </div>
    </div>
  )
}
