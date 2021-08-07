import React from "react";

import { getDiets } from "../../actions/index.js";
import { connect, useDispatch } from "react-redux";

export function FilterBy(props){
  const [option, setOption] = React.useState("");

  // const dispatch = useDispatch();
  useEffect(() = {
    props.getDiets();
  }, [])

  const handleInputChange = function(f){
    setState(f.target.value);
    //should call a function that filters showed recipes by the option selected
  }
  
  return (
    <div>
      <select name="filter-by" defaultValue="see-all"
          value={option} onChange={handleInputChange}>
        {props.diets && props.diets.map((diet) =>
          <option value={diet.name}>{diet.name}</option>
        )}
      </select>
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return {
    getDiets: () => dispatch(getDiets())
  }
}

export default connect(null, mapDispatchToProps)(FilterBy);
