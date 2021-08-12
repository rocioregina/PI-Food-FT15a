import React from "react";

export default function Recipe({props}){
  console.log(props)
  return (
    <div>
      <h3>{props.title}</h3>
      <img src={props.image}/>
      {props.diets && props.diets.map((d) =>
          {return <span>{d.replaceAll('_', ' ')}</span>}
      )}
    </div>
  )
}
