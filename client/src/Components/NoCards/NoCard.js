import React from "react";
import "./NoCard.css";
import { FaBoxOpen } from "react-icons/fa";
import {useHistory} from 'react-router-dom';

function NoCard() {
  const history=useHistory();
  return (
    <div className="whole-container-nc">
      <div className="container-cards-nc">
        <div className="FaBoxOpen-nc">
          <FaBoxOpen className="nc-icon"/>
        </div>
        <h1 className="h1-nc">You have no cards</h1>
        <h3 className="h3-nc">To get started, make some</h3>
        <div className="btn-nc">
          <button onClick={()=>history.push('/new')}>Create a card</button>
        </div>
      </div>
    </div>
  );
}

export default NoCard;
