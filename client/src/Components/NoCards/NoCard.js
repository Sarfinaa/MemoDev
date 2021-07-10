import React from "react";
import "./NoCard.css";
import { FaBoxOpen,FaRegFlag } from "react-icons/fa";
import {useHistory} from 'react-router-dom';

function NoCard({inTrain}) {
  const history=useHistory();
  return (
    <div className="whole-container-nc">
      <div className="container-cards-nc">
        <div className="FaBoxOpen-nc">
          {inTrain ? <FaRegFlag className="nc-icon"/> : <FaBoxOpen className="nc-icon"/>}
          
        </div>
        <h1 className="h1-nc">{inTrain ? "Session completed" :"You have no cards"}</h1>
        <h3 className="h3-nc">{inTrain ? "Create more cards to learn more." : "To get started, make some"}</h3>
        <div className="btn-nc">
          <button onClick={()=>history.push('/new')}>Create {inTrain ? "more cards" : "a card"}</button>

        </div>
      </div>
    </div>
  );
}

export default NoCard;
