import React,{useState,useEffect,useRef} from "react";
import "./Training.css";
import Editor from '../Editor/Editor';
import {useSelector} from 'react-redux';
function Training() {
  const cards = useSelector(state => state.cards.cards);
  const [counter,setCounter]=useState(0);
  const [card,setCard]=useState(cards[counter]);
  const [finished,setFinished]=useState(false);
  const [content,setContent]=useState('');
  const [showbuttons,setShowButtons]=useState(false);
  const[correct,setCorrect]=useState(false);
  const [readonly,setReadOnly]=useState(false);
  let select=card?.selected.substring(0,card?.selected.length-1);
  let clearRef=useRef(null);
  const placeholder=card?.text.replace(select,'{<Type Your Selected Code!!>}')
  //console.log("sdsd",placeholder );
  useEffect(()=>{
    if(cards?.length===counter) setFinished(true);
   else setCard(cards[counter]);
   
  },[counter])
const handleSumbit=()=>{
  setReadOnly(true);
checkCorrect();
setShowButtons(true);
} 
const handleNext=()=>{
   console.log("Ref variable",clearRef.clear());
  if(counter<cards?.length)
  setCounter(counter+1);
  setReadOnly(false);
setShowButtons(false);
}
const handleAnotherShot=()=>{

  setReadOnly(false);
  setShowButtons(false);
}
const checkCorrect=()=>{
  if(content.trim()===card.selected.trim())
    setCorrect(true);
  else setCorrect(false);
}
if(finished){
  return (
<h1>FINISHED</h1>
  )
}
  return (
 
    <div>
      <div className="main-container-tr">
        <div className="container-tr">
          <div className="tr1">
              <p className="t-card-heading">{card?.wul}</p>
              <p className="t-card-language">{card?.language}</p>
          </div>
          <div className="tr2">
              <Editor clearRef={clearRef} readonly={readonly} placeholder={placeholder}getContent={(content)=>setContent(content)} />
              {showbuttons&&
           <div>
           {correct? <div>Yours:{content}</div>:(
             <>
             <div>yours:{content}</div>
             <div>Original:{card?.selected}</div>
             </>
           )}
          
         </div>
          }
          </div>
          
         
         {showbuttons&&<>
          <div className="tr2.5">
          <button className='btn-tr3' onClick={handleNext}>Next</button>
          <button className='btn-tr3' onClick={handleAnotherShot}>Give another shot</button>
          </div>
          </>}
         {!showbuttons&&
         <div className="tr3">
         <button className='btn-tr3' onClick={handleSumbit}>Submit</button>
       </div>
         } 
        </div>
      </div>
    </div>
  );
}

export default Training;
