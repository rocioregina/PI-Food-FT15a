import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDiets } from "../../actions/index.js";

import SearchBar from '../SearchBar/SearchBar.js';
import Recipes from '../Recipes/Recipes.js';
//import filter and pag component here

export default function Principal(){
  return (
    <div>
      <Link>
        <SearchBar/>
      </Link>
      //filter components here (could be modularized)
      //order by
      <select>
        <option value="score">Score</option>
      </select>
      //diet type
      <select name="diets-list" id="diets-list">
        <option value="keto">Keto</option>
      </select>
      <Recipes/>
      //pag component here
    </div>
  )
}
