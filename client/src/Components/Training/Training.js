import React from "react";
import "./Training.css";
import Editor from '../Editor/Editor'
function Training() {
  return (
    <div>
      <div className="main-container-tr">
        <div className="container-tr">
          <div className="tr1">
              <p className="t-card-heading">diagonal sum</p>
              <p className="t-card-language">C++</p>
          </div>
          <div className="tr2">
              <Editor/>
          </div>
          <div className="tr2.5">
          <button className='btn-tr3'>Good</button>
          <button className='btn-tr3'>Give another shot</button>
          
          </div>
          <div className="tr3">
            <button className='btn-tr3'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Training;
