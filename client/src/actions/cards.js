import {CREATE,FETCH_ALL,DELETE} from '../constants/actionTypes';
import * as api from '../api/index';
export const createCard=(post)=>async(dispatch)=>{
    try{
       // dispatch({type:START_LOADING});
        //post api request and sending post
        const {data}=await api.createCard(post);
        dispatch({type:CREATE,payload:data});
      //  dispatch({type:END_LOADING});
    }catch(error){
console.log(error);
    }
}
export const getCards =() =>async(dispatch)=>{
  try{
      //Getting data from backend and setting that data to paylaod
    //  dispatch({type:START_LOADING});
      const {data}=await api.fetchCards();
      
  //When it dispatch action it goes to app.js 
          dispatch({ type:FETCH_ALL,payload:data});
        //  dispatch({type:END_LOADING});
  }catch(error){
console.log(error);
  }
}
export const deleteCard=(id)=> async(dispatch)=>{
  try{
await api.deleteCard(id);
dispatch({type:DELETE,payload:id});
  }catch(error){
      console.log(error)

  }
}