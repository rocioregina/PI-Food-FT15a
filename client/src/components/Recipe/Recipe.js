import React from "react";

export default function Recipe({props}){
  return (
    <div>
      <h3>{props.title}</h3>
      <img src={props.image}/>
      {props.diets && props.diets.map((d) =>
          {return <span>{d.name.replaceAll('_', ' ')}</span>}
      )}
    </div>
  )
}
