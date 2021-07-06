import React, { useState,useEffect } from "react";
import Input1 from "../Input/Input";
import { List } from "./List";
import { Input } from "@material-ui/core";
import SelectSearch from "react-select-search";
import Fuse from "fuse.js";
import "./search.css";
import "./New.css";

function New() {
  const [language, setLanguage] = useState("Plain Text");
  const [textlen, setTextlen] = useState(0);
  const [text,setText]=useState("");
  const [selected,setSelected]=useState("");
  const [postData,setPostData]=useState({
    language:'',
    wul:'',
    selected:'',
     text:''
        });
  const options = {
    keys: ["name"],
  };

const saveChange=()=>{
setPostData({...postData,selected:selected,text:text});


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
    <div className="container">
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
        <Input1 changelen={(len) => setTextlen(len)} getText={text=>setText(text)} language={language} getSelected={select=>setSelected(select)}/>
        <h3 className="text1">This card is about </h3>
        <Input
          placeholder="language"
         onChange={(e)=>setPostData({...postData,language:e.target.value})}
          style={{ width: "9%", fontSize: "small", margin: "0px 5px" }}
          inputProps={{ "aria-label": "description" }}
        />
        <h3 className="text1">and learned how to </h3>
        <Input
          placeholder="what you learned"
          onChange={(e)=>setPostData({...postData,wul:e.target.value})}
          style={{ width: "14%", fontSize: "small", margin: "0px 5px" }}
          inputProps={{ "aria-label": "description" }}
        />
        <button className="button3" onClick={saveChange}>Save</button>
       {/* {console.log(postData)} */}
    </div>
  );
}

export default React.memo(New);
