import React, { useEffect } from "react";

export default function DetailedRecipe({props}){
  console.log(props)
  // document.querySelector("#summary").innerHTML = props.summary

  useEffect(() => { //changes inner html from summary so tags work
      document.querySelector("#summary").innerHTML = props.summary
      console.log("hola")
  })

  return (
    <div>
      <h4>{props.title}</h4>
      <img src={props.image}/>
      <p id='summary'></p>
      <h2>{props.spoonacularScore}</h2>
      <h2>{props.healthScore}</h2>
    </div>
  )
}
