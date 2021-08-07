import React from "react";

import { addRecipe } from "../../actions/index.js";
import { connect } from "react-redux";

export function Create(props){
  const [state, setState] = React.useState({
    title: '',
    summary: '',
    spoonacularScore: '',
    healthScore: '',
    analyzedInstructions: '',
    image: ''
  });

  const handleInputChange = function(e){
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async function(data){
    let post = await addRecipe(data);
    alert(post.data.msg);
  }

  return (
    <div>
      <form onSubmit={(e) => {e.preventDefault(); handleSubmit(state)}}>
        <label>Title</label>
        <input name='title' value={state.title} onChange={handleInputChange}></input>
        <label>Summary</label>
        <input name='summary' value={state.summary} onChange={handleInputChange}></input>
        <label>Score</label>
        <input name='spoonacularScore' value={state.spoonacularScore} onChange={handleInputChange}></input>
        <label>Health Level</label>
        <input name='healthScore' value={state.healthScore} onChange={handleInputChange}></input>
        <label>Steps</label>
        <input name='analyzedInstructions' value={state.analyzedInstructions} onChange={handleInputChange}></input>
        <button type='submit'>Upload Recipe</button>
      </form>
    </div>
  )
};

function mapDispatchToProps(dispatch){
  return {
    addRecipe: recipe => dispatch(addRecipe(recipe))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Create);
