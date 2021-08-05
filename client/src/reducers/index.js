const initialState = {
  recipesLoaded: [],
  recipeDetail: {}
};

export default function rootReducer(state = initialState, action){
  switch(action.type){
    case "GET_RECIPES":
      return {
        ...state,
        recipesLoaded: action.payload.Search //returns searched recipes.. from local host?
      }
    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        recipeDetail: action.payload  //returns detailed recipe.. from local host?
      }
    // case "GET_DIETS":
    //   return {
    //
    //   }
    default: return state
  }
}
