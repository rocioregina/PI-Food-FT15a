import React from "react";

import { getRecipeDetail } from "../../actions/index.js";
import { connect } from "react-redux";
import DetailedRecipe from "../DetailedRecipe/DetailedRecipe.js";

export function Detail(props){
  // useEffect(() => {
  //   props.getRecipeDetail(props.recipe.id)
  // }, [])

  console.log(props, '1')
  console.log(props.recipe, '2')
  return (
    <div>
      <DetailedRecipe props={props.recipe}/>
    </div>
  )
}

function mapStateToProps(state){
  return {
    recipe: state.recipeDetail
  }
}

function mapDispatchToProps(dispatch){
  return {
    getRecipeDetail: recipe => dispatch(getRecipeDetail(recipe))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
