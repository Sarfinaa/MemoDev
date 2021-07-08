import React, { useState,useEffect } from "react";
import Input1 from "../Input/Input";
import { List } from "./List";
import { useHistory } from "react-router";
import { Input } from "@material-ui/core";
import SelectSearch from "react-select-search";
import Fuse from "fuse.js";
import "./search.css";
import "./New.css";
import {useDispatch} from 'react-redux'; 
import {createCard,updateCard} from '../../actions/cards'
import {useSelector} from 'react-redux';

function New({newinCard,setEdit,currentId,setCurrentId}) {
  const history=useHistory();
  const card=useSelector(state=>currentId?state.cards.cards.find((p)=>p._id===currentId):null);
  const [textlen, setTextlen] = useState(0);
  const [text,setText]=useState("");
  const [selected,setSelected]=useState("");
  const [error,setError]=useState(false);
  const [language, setLanguage] = useState(card?card.language:"Plain Text");

  const [postData,setPostData]=useState({
    language:'',
    wul:'',
    selected:'',
     text:''
        });
        const clear=()=>{
          setPostData({
            language:'',
          wul:'',
      selected:'',
     text:''
          })
        }
  const dispatch=useDispatch();
        const user=JSON.parse(localStorage.getItem('profile'));
        useEffect(()=>{
          if(card){
            setPostData(card);
         } 
              },[card])
  const options = {
    keys: ["name"],
  };

const saveChange=(e)=>{
 e.preventDefault();
  if(selected.length===0||postData.language.length===0||postData.wul.length===0) setError(true);
  else setError(false) ;
if(selected.length>0&&postData.language.length>0&&postData.wul.length>0)
{
  if(currentId){
    dispatch(updateCard(currentId,{...postData,name:user?.result?.name}));

}else {
    
dispatch(createCard({...postData,name:user?.result?.name}));
clear();
}

if(currentId) setEdit(false);
else
history.push('/cards');
}


}

  const fuzzySearch = () => {
    const fuse = new Fuse(List, options);
    return (searchValue) => {
      if (searchValue.length === 0) {
        return List;
      } else {
        let arr = [];
        let obj = fuse.search(searchValue);
        for (let i = 0; i < obj.length; i++) arr.push(obj[i].item);
        return arr;
      }
    };
  };

  const handleSelectChange = (language) => {
    setLanguage(language);
  };
  return (
    <div className={`container ${newinCard && "change-container"}`}>
      <div className="container-top">
        <div className="renderedtext">
          {textlen == 0 || textlen > 1 ? (
            <h2>Select what you'd like to remember</h2>
          ) : (
            <h2>Paste or type in your code</h2>
          )}
        </div>
        <SelectSearch
          options={List}
          search
          value={language}
          filterOptions={fuzzySearch}
          placeholder="Select Language"
          onChange={handleSelectChange}
        />
      </div>
        <Input1 card={card} newinCard setError={setError} changelen={(len) => setTextlen(len)} getText={text=>setText(text)} language={language} getSelected={select=>setSelected(select)}/>
        <h3 className="text1">This card is about </h3>
        <form style={{display:'inline'}}>
        <Input 
          placeholder="language"
          value={postData.language}
         onChange={(e)=>setPostData({...postData,language:e.target.value})}
          style={{ width: "9%", fontSize: "small", margin: "0px 5px" }}
          inputProps={{ "aria-label": "description" }}
        />
        <h3 className="text1">and learned how to </h3>
        <Input 
        value={postData.wul}
          placeholder="what you learned"
          onChange={(e)=>setPostData({...postData,wul:e.target.value,selected,text})}
          style={{ width: "14%", fontSize: "small", margin: "0px 5px" }}
          inputProps={{ "aria-label": "description" }}
        />
        <div className="btn-container-edit">
        {newinCard&&<button className="button3" onClick={()=>setEdit(false)}>Cancel</button>}  
        <button className="button3" onClick={saveChange}>Save</button>
        </div>
        </form>
        {error&&<div>SELECTION AND ALL INFO IS REQUIRED!!</div>}
{console.log(postData)}
    </div>
  );
}

export default New;
