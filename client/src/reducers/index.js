const initialState = {
  recipesLoaded: [],
  recipesRender: [],
  dietsLoaded: [],
  recipeDetail: {},
  postedRecipe: {default: true},
  favoriteRecipes: []
};

export default function rootReducer(state = initialState, action){
  switch(action.type){
    case "GET_RECIPES":
      return {
        ...state,
        recipesLoaded: action.payload, //returns searched recipes.. from local host
        recipesRender: action.payload
      }
    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        recipeDetail: action.payload  //returns detailed recipe.. from local host
      }
    case "ADD_RECIPE":
      return {
        ...state,
        postedRecipe: action.payload
      }
    case "GET_DIETS":
      return {
        ...state,
        dietsLoaded: action.payload
      }
    case "ADD_FAVORITE":
      return {
        ...state,
        favoriteRecipes: state.favoriteRecipes.concat(action.payload)
      }
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favoriteRecipes: state.favoriteRecipes.filter((recipe) => recipe.id !== action.payload)
      }
    case "SET_FILTER":
      if(action.payload === "see all"){
        var aux = state.recipesLoaded
        console.log(action.payload)
        return {
          ...state,
          recipesRender: aux
        }
      }else{
      console.log(action.payload)
      return {
        ...state,
        recipesRender: state.recipesLoaded.filter((recipe) => {
          console.log(recipe.diets)
          console.log(recipe.diets.some((e) => e.name === action.payload), "1020012")
          return recipe.diets.some((e) => e.name === action.payload)
        })
      }
    }
    case "SET_ORDER":
      var orderedRecipes = state.recipesRender;
      if(action.payload === "see-all"){orderedRecipes.sort((a, b) => {
        if(a.id > b.id)return 1;
        if(a.id < b.id)return -1;
        return 0;
      })} //sorts by id
      if(action.payload === "score-asc"){orderedRecipes = orderedRecipes.sort((a, b) => {
        if(a.spoonacularScore > b.spoonacularScore)return 1;
        if(a.spoonacularScore < b.spoonacularScore)return -1;
        return 0;
      })} //sorts by asc score
      if(action.payload === "score-desc"){orderedRecipes.sort((a, b) => {
        if(a.spoonacularScore < b.spoonacularScore)return 1;
        if(a.spoonacularScore > b.spoonacularScore)return -1;
        return 0;
      })}  //sorts by desc score
      if(action.payload === "alph-asc"){orderedRecipes.sort((a, b) => {
        if(a.title > b.title)return 1;
        if(a.title < b.title)return -1;
        return 0;
      })}  //sorts by title from a to z
      if(action.payload === "alph-desc"){orderedRecipes.sort((a, b) => {
        if(a.title < b.title)return 1;
        if(a.title > b.title)return -1;
        return 0;
      })} //sorts by title from z to a
      return {
        ...state,
        recipesRender: orderedRecipes
      }
    default: return state
  }
}
