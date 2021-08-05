//app actions

export function getRecipes(payload){
  return {type: "GET_RECIPES", payload: payload}; //llamado a la api?
}

export function getRecipeDetail(id){
  return {type: "GET_RECIPE_DETAIL", payload: id}; //llamado a la api?
}

// export function getDiets(){
//   return {type: "GET_DIETS"};
// }

// export function addRecipeFavorite(payload){
//   return {type: "ADD_RECIPE_FAVORITE", payload: payload};
// }
