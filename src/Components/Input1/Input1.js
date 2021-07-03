import React, { useState, useEffect ,useRef} from "react";
import Prism from "prismjs";
import {Helmet} from "react-helmet";
import $ from 'jquery';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import './search.css';
import './Input1.css';
function Input1(props) {
  const [content, setContent] = useState("");
  const scroll = useRef(null);

  const  sync_scroll=()=> {
    let element = document.querySelector("#editing");
    let result_element = document.querySelector("#highlighting");
    
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  }
  const handleKeyDown = (evt) => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    // handle 4-spce indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent(value);
    }
  };

  useEffect(() => {
    // $("textarea").each(function () {
    //   this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    // }).on("input", function () {
    //   this.style.height = "auto";
    //   this.style.height = (this.scrollHeight) + "px";
    // });
  
    Prism.highlightAll();
  }, [props.language, content]);
const handleChange=(evt)=>{
  sync_scroll();
  setContent(evt.target.value);
}
const options=[
  { value: 's', name: 'Small' },
  { value: 'm', name: 'Medium' },
  { value: 'l', name: 'Large' },
];
const option={
  keys: [
    "name"
  ]
}
//const fuzzySearch = new Fuse(options, option);
//fuse.search(pattern)
  return (
    <>
    <SelectSearch
        options={options}
        search
       // filterOptions={fuzzySearch}
        placeholder="Syntax"
    />
   
    <div className="code-edit-container">
      <textarea 
      placeholder="Type your code here..."
      id="editing"
        className="code-input"
        onScroll={sync_scroll}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <pre aria-hidden="true" id="highlighting" className="code-output">
        <code id="highlighting-content" className={`language-${props.language}`}>{content}</code>
      </pre>
      
  </div>
    </>
    
  );
};

export default Input1
