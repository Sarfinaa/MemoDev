import React,{useState} from 'react';
import 'prismjs/themes/prism.css'
const Element = ({ attributes, children, element }) => {
  const [value,setValue]=useState('');
  switch (element.type) {
     case 'code-line':
      return <div className="codeLine" {...attributes}>{children}</div>;
      case 'input':
        return <div className="codeLine" {...attributes}>
          {children}
          </div>;
    case 'code-block':
      return (
        <pre  {...attributes}>
          <code >{children}</code>
        </pre>
      );
    default:
      return <div {...attributes}>{children}</div>;
  }
};
export default Element;