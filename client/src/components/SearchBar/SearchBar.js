import React from "react";
import { connect } from "react-redux";
import { getRecipes } from '../../actions/index.js';

import './SearchBar.css';

export function SearchBar(props){
  const [recipe, setRecipe] = React.useState("");

  return (
    <div className='searchbar'>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.getRecipes(recipe);
        }}>
        <div className='searchbar-body'>
          <div className='searchbar-input'>
            <input
            type="text"
            placeholder="Search recipes..."
            value={recipe}
            onChange={r => setRecipe(r.target.value)}
            />
          </div>
          <div className='submit-button'>
            <input type="submit" value="Search"/>
          </div>
        </div>
      </form>
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
