import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "./Editor.css";
import "prismjs/themes/prism.css";
function Editor({language,value,noPlaceholder}) {
    const [content, setContent] = useState("");
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
      };
    
      useEffect(() => {
        Prism.highlightAll();
      }, [language, content]);
    
      return (
        <div className={`code-edit-container ` }>
          <textarea
          readOnly={noPlaceholder?true:false}
            placeholder={!noPlaceholder&&"Type your code here..."}
            id="editing"
            className={noPlaceholder&&'code-inputs'}
            onScroll={sync_scroll}
            value={value?value:content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <pre aria-hidden="true" id="highlighting" className={noPlaceholder&&'code-outputs'}>
            <code id="highlighting-content" className={`language-${language}`}>
              {value?value:content}
            </code>
          </pre>
        </div>
    )
}

export default Editor
