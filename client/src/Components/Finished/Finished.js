import React from 'react'
import  "./Finished.css"
import { FaRegFlag } from "react-icons/fa"; 

function Finished() {
    return (
        <div>
            <div className="whole-container-nc">
      <div className="container-cards-nc">
        <div className="FaBoxOpen-nc">
          <FaRegFlag className="nc-icon"/>
        </div>
        <h1 className="h1-nc">Finished</h1>
        <h3 className="h3-nc">Create more cards to learn more.</h3>
        <div className="btn-nc">
          <button>Home</button>
        </div>
      </div>
    </div>
        </div>
    )
}

export default Finished
