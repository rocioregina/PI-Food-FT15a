import React from "react";

import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeDetail } from "../../actions/index.js";
import DetailedRecipe from "../DetailedRecipe/DetailedRecipe.js";

export default function Detail(props){
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetail);
  // const matchRecipe = useRef(match.params.id);

  useEffect(() => {
    console.log(props.match.params.id)
    dispatch(getRecipeDetail(props.match.params.id));
  }, [])

  return (
    <div>
      <DetailedRecipe props={recipe}/>
    </div>
  )
}
