const initialState = {
  recipesLoaded: [],
  dietsLoaded: [],
  recipeDetail: {},
  filter: "",
  order: ""
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
    case "SET_FILTER":
      var filtrado = state.recipesLoaded
      return {
        ...state,
        filter: action.payload
      }
    case "SET_ORDER":
      return {
        ...state,
        order: action.payload
      }
    default: return state
  }
}
