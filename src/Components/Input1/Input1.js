import React, { useState, useEffect ,useRef} from "react";
import Prism from "prismjs";
import './Input1.css';
function Input1(props) {
  const [content, setContent] = useState("");
  const scroll = useRef(null);

  const  sync_scroll=()=> {
    let element = document.querySelector("#editing");
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector("#highlighting");
    // Get and set x and y
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
    Prism.highlightAll();
  }, [props.language, content]);
const handleChange=(evt)=>{
  sync_scroll();
  setContent(evt.target.value);
}
  return (
    <div  className="code-edit-container">
      <textarea 
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
  );
};

export default Input1
