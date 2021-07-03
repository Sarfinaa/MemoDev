import React, { useState, useEffect} from "react";
import Prism from 'prismjs';
import './Input.css';
import 'prismjs/themes/prism.css'
function Input({language}) {
  const [content, setContent] = useState("");
  const  sync_scroll=()=> {
    let element = document.querySelector("#editing");
    let result_element = document.querySelector("#highlighting");
    
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  }
  const handleKeyDown = (evt) => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

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
  }, [language, content]);
const handleChange=(evt)=>{
  sync_scroll();
  setContent(evt.target.value);
}

  return (
    <>
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
        <code id="highlighting-content" className={`language-C`}>{content}</code>
      </pre>  
      
  </div>
    </>
    
  );
};

export default Input;
