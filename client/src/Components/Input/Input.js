import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "./Input.css";
import "prismjs/themes/prism.css";
//import 'prismjs/components/prism-java'
function Input({ language, changelen,getSelected,getText,setError}) {
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState("");
  const sync_scroll = () => {
    let element = document.querySelector("#editing");
    let result_element = document.querySelector("#highlighting");

    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  };
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

  const handleChange = (evt) => {
    sync_scroll();
    setContent(evt.target.value);
    changelen(content.length);
    getText(content);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [language, content]);

  let ar = [];
  const displaySelect = () => {
    let text = document.getElementById("editing");
    let t = text.value.substr(
      text.selectionStart,
      text.selectionEnd - text.selectionStart
    );
    ar.push(t);
    setSelected(ar[0]);
    getSelected(ar[0]);
    if(ar[0].length>0){
      setError(false);
    }
  }
  const unSelect = () => {
    ar = [];
    setSelected("");
    getSelected("");

  };
  return (
    <>
      <div className="main">
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
            <code id="highlighting-content" className={`language-${language}`}>
              {content}
            </code>
          </pre>
        </div>
      </div>
      <div className="para"><h4><span>Note:</span>Selection of code must be continuous !</h4></div>
      {selected.length > 0 && (
        <div className="selectedtext">Selected Text:{selected}</div>
      )}
      <div className="button-container">
        {" "}
        <button className="button" onClick={displaySelect}>
          Select
        </button>
        <button className="button" onClick={unSelect}>
          Unselect
        </button>
      </div>
    </>
  );
}

export default React.memo(Input);
