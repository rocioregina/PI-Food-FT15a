import React from "react";
import { connect } from "react-redux";
import { getRecipes } from '../../actions/index.js';

import './SearchBar.css';

export function SearchBar(props){
  const [recipe, setRecipe] = React.useState("");

  return (
    <div className='searchbar'>
      <div className='searchbar-body'>
        <form onSubmit={(e) => {
          e.preventDefault();
          props.getRecipes(recipe);
          }}>
        <div className='searchbar-input'>
          <input
          className='input'
          type="text"
          placeholder="Recipe..."
          value={recipe}
          onChange={r => setRecipe(r.target.value)}
          />
        </div>
        <div className='submit-button'>
          <input type="submit" value="Search"/>
        </div>
        </form>
      </div>
    </div>
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
