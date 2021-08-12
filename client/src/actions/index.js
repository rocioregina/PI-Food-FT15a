//app actions
import axios from 'axios';

export function getRecipes(name){
  return  async function(dispatch){
    var json;
    if(name){
      json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    }else{
      json = await axios.get("http://localhost:3001/recipes");
    }
      return dispatch({
        type: "GET_RECIPES",
        payload: json.data
      })
  }
}

export function getRecipeDetail(id){
  return async function(dispatch){
    var json = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: "GET_RECIPE_DETAIL",
      payload: json.data
    })
  }
}

export function addRecipe(recipe){
  return async function(dispatch){
    if(!recipe){
      return dispatch({
        type: "ADD_RECIPE",
        payload: {default: true}
      })
    }
    var res = await axios.post(`http://localhost:3001/recipe`, recipe);
    return dispatch({
      type: "ADD_RECIPE",
      payload: res.data
    })
  }
}

export function getDiets(){
  return async function(dispatch){
    var json = await axios.get(`http://localhost:3001/types`);
    return dispatch({
      type: "GET_DIETS",
      payload: json.data
    })
  }
}

export function setRecipeFilter(filter){
  return {
      type: "SET_FILTER",
      payload: filter
    }
}

export function setRecipeOrder(order){
  return {
      type: "SET_ORDER",
      payload: order
  }
}

// export function addRecipeFavorite(payload){
//   return {type: "ADD_RECIPE_FAVORITE", payload: payload};
// }
