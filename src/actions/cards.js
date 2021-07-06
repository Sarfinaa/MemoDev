import {CREATE} from '../constants/actionTypes';
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