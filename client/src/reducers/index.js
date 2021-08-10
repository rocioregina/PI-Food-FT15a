const initialState = {
  recipesLoaded: [],
  dietsLoaded: [],
  recipeDetail: {}
};

export default function rootReducer(state = initialState, action){
  switch(action.type){
    case "GET_RECIPES":
      return {
        ...state,
        recipesLoaded: action.payload //returns searched recipes.. from local host
      }
    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        recipeDetail: action.payload  //returns detailed recipe.. from local host
      }
    case "ADD_RECIPE":
      return {
        ...state,
        recipesLoaded: action.payload
      }
    case "GET_DIETS":
      return {
        ...state,
        dietsLoaded: action.payload
      }
    default: return state
  }
}
