import React from "react";

export default function OrderBy(){
  //not tested yet
  const [option, setOption] = React.useState("");

  const handleInputChange = function(o){
    setState(o.target.value);
    //should call a function that filters showed recipes by the option selected
  }

  return (
    <div>
      <select name="order-by" defaultValue="see-all"
          value={option} onChange={handleInputChange}>
        <option value="see-all">See all</option>
        <option value="score-asc">Score(asc)</option>
        <option value="score-desc">Score(desc)</option>
        <option value="alph-asc">Alphabetical(asc)</option>
        <option value="alph-desc">Alphabetical(desc)</option>
      </select>
    </div>
  )
}
