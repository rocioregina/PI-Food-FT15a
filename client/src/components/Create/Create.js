import React, { useEffect } from "react";

import { addRecipe, getDiets } from "../../actions/index.js";
import { connect } from "react-redux";

export function Create(props){
  const [state, setState] = React.useState({
    title: '',
    summary: '',
    spoonacularScore: 0,
    healthScore: 0,
    analyzedInstructions: [],
    image: '',
    diets: []
  });
  const [answer, setAnswer] = React.useState({})

  const handleInputChange = function(e){
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = function(){
    props.addRecipe(state);
  }

  const handleSelection = function(e){
    var array = state.diets;
    var found = array.find((d) => d === e.target.value);
    if(!found){
      array.push(e.target.value)
      setState({
        ...state,
        diets: array
      })
    }
  }

  const deleteThis = function(e){
    var filtered = state.diets.filter((d) => d !== e)
    setState({
      ...state,
      diets: filtered
    })
  }

  useEffect(() => {
    props.getDiets();
    props.addRecipe(false)
  }, [])

  useEffect(() => {
    if(!props.recipe.default){
      setAnswer(props.recipe)
    }
  }, [props.recipe])

  useEffect(() => { //fixes alert loop when going back
    if(answer.msg){
      alert(answer.msg)
      delete answer.msg
    }
  }, [answer])

  return (
    <div>
      <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
        <label>Title</label>
        <input name='title' value={state.title} onChange={handleInputChange}></input>
        <label>Summary</label>
        <input name='summary' value={state.summary} onChange={handleInputChange}></input>
        <label>Score</label>
        <input name='spoonacularScore' value={state.spoonacularScore} onChange={handleInputChange}></input>
        <label>Health Level</label>
        <input name='healthScore' value={state.healthScore} onChange={handleInputChange}></input>
        <label>Image url</label>
        <input name='image' value={state.image} onChange={handleInputChange}></input>
        <label>Diet types</label>
        <select
        name="diet-selector"
        onChange={handleSelection}>
          {props.diets.map((diet) =>
            {return <option value={diet.name}>{diet.name}</option>}
          )}
        </select>
        <ul>
          {state.diets.length !== 0 ? state.diets.map((diet) => {
            return <li>{diet}
              <button onClick={() => deleteThis(diet)}>x</button>
            </li>
          }) : []}
        </ul>
        <label>Steps</label>
        <input name='analyzedInstructions' value={state.analyzedInstructions} onChange={handleInputChange}></input>
        {state.title && state.summary ? <button type='submit'>Upload Recipe</button> : <button type='submit' disabled>Upload Recipe</button>}
      </form>
    </div>
  )
};

function mapStateToProps(state){
  return {
    recipe: state.postedRecipe,
    diets: state.dietsLoaded
  }
}

function mapDispatchToProps(dispatch){
  return {
    addRecipe: recipe => dispatch(addRecipe(recipe)),
    getDiets: () => dispatch(getDiets())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
