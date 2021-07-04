import React ,{useState}from 'react'
import Input from '../Input/Input';
import {List} from './List';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import './search.css';
import './New.css';
function New() {
    const [language,setLanguage]=useState("Plain Text");
    const [textlen,setTextlen]=useState(0);
    const options={
        keys: [
          "name"
        ]
      }
    const fuzzySearch=()=>{
        const fuse = new Fuse(List, options);
        return (searchValue)=>{
          if(searchValue.length===0){
            return List;
          }else{
          let arr=[];
          let obj=fuse.search(searchValue);
          for(let i=0;i<obj.length;i++)
          arr.push(obj[i].item);
      return arr;
          }
        }
      }
      const handleSelectChange=(language)=>{
      setLanguage(language);
      }
    return (
        <div className="container">
          <div className="container-top">
            {textlen==0||textlen>1?<div>
              Select what you'd like to remember
            </div>:
            <div>
              Paste or type in your code
              </div>}
          <SelectSearch
        options={List}
        search
        value={language}
        filterOptions={fuzzySearch} 
        placeholder="Select Language"
        onChange={handleSelectChange}
    /> 
          </div>
        
    <Input changelen={len=>setTextlen(len)}language={language}/>
        </div>
    )
}

export default New
