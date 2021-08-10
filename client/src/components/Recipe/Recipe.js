import React from "react";

export default function Recipe({props}){
  console.log(props.dietss)
  return (
    <div>
      <h3>{props.title}</h3>
      <img src={props.image}/>
      {props.dietss && props.dietss.map((d) =>
          {return <span>{d}</span>}
      )}
    </div>
  )
}
