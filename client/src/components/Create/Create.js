import React, { useEffect } from "react";

import { addRecipe, getDiets } from "../../actions/index.js";
import { connect } from "react-redux";
import './Create.css';

export function Create(props){
  const [state, setState] = React.useState({
    title: '',
    summary: '',
    spoonacularScore: 0,
    healthScore: 0,
    analyzedInstructions: [''],
    image: '',
    diets: []
  });
  const [answer, setAnswer] = React.useState({})
  const [errors, setErrors] = React.useState({})

  const handleInputChange = function(e){  //sets the form state and all the correspondant errors
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
    setErrors(validate({
      ...state,
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = function(){  //submits the entire form dispatching the action that adds the recipe to the database
    props.addRecipe(state);
  }

  const handleSelection = function(e){  //adds the diet selected to the selected diets array, if it's not been selected yet
    var array = state.diets;
    var found = array.find((d) => d === parseInt(e.target.value));
    if(!found && found !== "see-all"){
      array.push(parseInt(e.target.value))
      setState({
        ...state,
        diets: array
      })
      setErrors(validate({
        ...state,
        diets: array
      }))
    }
  }

  const deleteThis = function(e){ //deletes an item from the selected diets list
    var filtered = state.diets.filter((d) => d !== e)
    setState({
      ...state,
      diets: filtered
    })
  }

  const addStep = function(e){  //adds an empty input field to the instructions array
    var array = state.analyzedInstructions;
    array.push('');
    setState({
      ...state,
      analyzedInstructions: array
    })
  }

  const removeStep = function(idx){ //removes the input field from the instructions array by idx passed
    var removed = state.analyzedInstructions;
    removed.splice(idx, 1);
    setState({
      ...state,
      analyzedInstructions: removed
    })
  }

  const changeStep = function(e, idx){  //modifies the step input content
    var array = state.analyzedInstructions;
    array[idx] = e.target.value;
    setState({
      ...state,
      analyzedInstructions: array
    })
  }

  const validate = function(state){
    let errors = {};
    let urlExpression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var urlRegex = new RegExp(urlExpression);

    if(!state.title){
      errors.title = "Title is required";
    }
    if(!state.summary){
      errors.summary = "Summary is required";
    }
    if(typeof state.spoonacularScore !== 'number'){
      errors.spoonacularScore = "Score is invalid";
    } else if (state.spoonacularScore > 100 || state.spoonacularScore < 0){
      errors.spoonacularScore = "Score must be a value between 0-100";
    }
    if(typeof state.healthScore !== 'number'){
      errors.healthScore = "Score is invalid";
    } else if (state.healthScore > 100 || state.healthScore < 0){
      errors.healthScore = "Score must be a value between 0-100";
    }
    if(!urlRegex.test(state.image)){
      errors.image = "Url is invalid";
    }
    if(state.diets.length < 1){
      errors.diets = "Select at least one diet";
    }
    return errors;
  }

  useEffect(() => {
    props.getDiets();
    props.addRecipe(false)
    setErrors(validate(state))
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
    <div className='create'>
      <div className='form-box'>
      <div>
        <h2 className='title'>Create Recipe</h2>
      </div>
      <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
      <div className='container'>
        <div className='column'>
          <div className='field'>
            <label>Title</label>
            <input className='input-box' placeholder='Title...' name='title' value={state.title} onChange={handleInputChange}></input>
            {errors.title && (<span classname="error">{errors.title}</span>)}
          </div>

          <div className='field'>
            <label>Score</label>
            <input className='input-box' name='spoonacularScore' placeholder='Score...' value={state.spoonacularScore} onChange={handleInputChange}></input>
            {errors.spoonacularScore && (<span classname="error">{errors.spoonacularScore}</span>)}
          </div>

          <div className='field'>
            <label>Health Level</label>
            <input className='input-box' name='healthScore' placeholder='Health score...' value={state.healthScore} onChange={handleInputChange}></input>
            {errors.healthScore && (<span classname="error">{errors.healthScore}</span>)}
          </div>

          <div className='field'>
            <label>Image url</label>
            <input className='input-box' name='image' placeholder='Image url...' value={state.image} onChange={handleInputChange}></input>
            {errors.image && (<span classname="error">{errors.image}</span>)}
          </div>
        </div>

        <div className='column'>

          <div className='field'>
          <label>Summary</label>
          <textarea className='input-box' placeholder='Summary...' name='summary' value={state.summary} onChange={handleInputChange}></textarea>
          {errors.summary && (<span classname="error">{errors.summary}</span>)}
          </div>

          <div className='field'>
            <label>Diet types</label>
            <select
            name="diet-selector"
            defaultValue="vegan"
            onChange={handleSelection}>
              {props.diets.map((diet) =>
                {return <option value={diet.id}>{diet.name}</option>}
              )}
            </select>
            {errors.diets && (<span classname="error">{errors.diets}</span>)}
          </div>

          <div className='field'>
            <label>Selected diets:</label>
            <div className='diet-box'>
            <ul>
              {state.diets.length === 0 && <li>No diets selected.</li>}
              {state.diets.length !== 0 ? state.diets.map((diet) => {
                var x = props.diets.find((e) => e.id === diet)
                return <li>{x.name}
                  <button className='remove-diet-button' onClick={() => deleteThis(diet)}>x</button>
                </li>
              }) : []}
            </ul>
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='field'>
            <label>Steps</label>
            <button className='add-button' onClick={(e) => addStep(e)}>Add Step</button>
            <div className='step-list'>
            {state.analyzedInstructions.map((step, idx) => {
              return (
                <div key={idx}>
                <input placeholder={`Step ${idx+1}`} value={step} onChange={(e) => changeStep(e, idx)}></input>
                <button onClick={() => removeStep(idx)}>x</button>
                </div>
              )
            })}
            </div>
          </div>
        </div>
        </div>

        <div className='submit-button-box'>
        {(Object.keys(errors).length < 1) ? <button id='submit-button' type='submit'>Upload Recipe</button> : <button id='submit-button' type='submit' disabled>Upload Recipe</button>}
        </div>
      </form>
      </div>
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
