import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRecipes } from '../../actions/index.js';

export function SearchBar(props){
  const [recipe, setRecipe] = React.useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      props.getRecipes(recipe);
    }}>
      <input
          type="text"
          placeholder="Recipe..."
          value={recipe}
          onChange={r => setRecipe(r.target.value)}
      />
      <input type="submit" value="Search"/>
    </form>
  )
}

function mapDispatchToProps(dispatch){
  return {
    getRecipes: recipe => dispatch(getRecipes(recipe))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
