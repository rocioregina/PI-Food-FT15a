import React from "react";

import { Link } from "react-router-dom";
import './Home.css';

export default function Home(){
  return (
    <div className='home-page'>

        <Link to='/recipes'>
          <button id='home-button'>Enter</button>
        </Link>
    </div>
  )
}
