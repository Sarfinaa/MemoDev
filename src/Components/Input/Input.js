
import React, { useEffect, useMemo, useState,useCallback } from 'react'
import { createEditor,Transforms,Editor,Text } from 'slate'
import { Slate, Editable ,withReact} from 'slate-react'
import {initialValue} from './SlateInitialValue';
import { withHistory } from 'slate-history'
import Prism from 'prismjs';
import Element from "./Element";
import 'prismjs/plugins/keep-markup/prism-keep-markup.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';


function Input() {
 
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const Leaf = props => {
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal'}}
      >
        {props.children}
      </span>)
      }
      const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
      }, [])
      
const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
}

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: 'all',
  })
  return !!match
}

  // Add the initial value when setting up our state.
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback(elProps => <Element {...elProps} />, []);

  useEffect(() => {
    console.log(Prism.plugins)
    // Disable this to see that Slate returns properly formatted code
    Prism.plugins.KeepMarkup = true;
    Prism.plugins.LineNumbers = true;
  Prism.highlightAll();
  }, [value]);

  return (
    <>
    <Slate
    editor={editor}
  
    value={value}
    onChange={newVal=>{
      setValue(newVal);
    }}
  >
    <Editable 
    placeholder="Type something"
    style={{
      backgroundColor:'#fafafa',
      maxWidth:'800px',
      minHeight:'150px',
      borderRadius:'10px'
    }}
    renderElement={renderElement}
    // renderLeaf={renderLeaf}
    // onDOMBeforeInput={event => {
     
          
    //       event.preventDefault()
    //     toggleFormat(editor,'bold')
  
    //     }
    //   }
    />
  </Slate>
  </>
  )
}

export default Input
