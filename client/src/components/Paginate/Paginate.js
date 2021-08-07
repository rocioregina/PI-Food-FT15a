import React from "react";

export function Paginate(props){
  const cantBotones = props.recipes.length/9;
  const [state, setState] = React.useState({
    num: '1',
    subArray: []
  });

  function onClick(n){
      setState({
        ...state,
        num: n,
        subArray: props.recipes.slice(9*num-9, 9*num)
      })
  }

  return (
    <div>
      {for(let i=1; i<cantBotones; i++){
        <button value={i} onClick={(e) => onClick(e.target.value)}>{i}</button>
      }}
    </div>
  )
}

// var subArray = props.recipes.slice(9*num-9, 9*num)
// <div>
//   {subArray.map((recipe) =>
//       <Recipe props={recipe}/>
//   )}
// </div>

function mapStateToProps(state) {
  return {
    recipes: state.recipesLoaded
  }
}

export default connect(mapStateToProps)(Paginate);
