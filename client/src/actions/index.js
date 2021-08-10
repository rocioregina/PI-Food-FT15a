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
    var json = await axios.get(`http://localhost:3001/recipes${id}`);
    return dispatch({
      type: "GET_RECIPE_DETAIL",
      payload: json.data
    })
  }
}

export function addRecipe(recipe){
  return async function(dispatch){
    axios.post(`http://localhost:3001/recipe`, recipe);
    return dispatch({
      type: "ADD_RECIPE",
      payload: recipe
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

// export function addRecipeFavorite(payload){
//   return {type: "ADD_RECIPE_FAVORITE", payload: payload};
// }
