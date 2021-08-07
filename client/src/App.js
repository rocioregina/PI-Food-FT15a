import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar.js";
import Home from "./components/Home/Home.js";
import Principal from "./components/Principal/Principal.js";
import Detail from "./components/Detail/Detail.js";
import Create from "./components/Create/Create.js";
import './App.css';

function App() {
  return (
      <div>
        <Route path="/" component={NavBar}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/recipes" component={Principal}/>
        <Route exact path="/recipes/:id" component={Detail}/>
        <Route exact path="/recipe" component={Create}/>
      </div>
  );
}

export default App;
