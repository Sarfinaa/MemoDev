import {CREATE,FETCH_ALL,DELETE} from '../constants/actionTypes';
const reducer =(state={//isLoading:true,
    cards:[]},action)=>{
    switch(action.type){
    //   case START_LOADING: return {...state,isLoading:true};
    //   case END_LOADING : return  {...state,isLoading:false};
    //   case FETCH_BY_SEARCH: return {...state,cards:action.payload};
    //   case FETCH_CARD: return {...state,card:action.payload};
    
        case FETCH_ALL: return{
          ...state,
         cards:action.payload.data
        } 
        case CREATE: return {...state,cards:[...state.cards,action.payload]};
        case DELETE: return {...state,cards:state.cards.filter(card=>card._id!==action.payload)};
        // case LIKE: return {...state,cards:state.cards.map((card)=>card._id===action.payload._id?action.payload:card )}; 
        // case UPDATE: 
        //    return {...state,cards:state.cards.map((card)=>card._id===action.payload._id?action.payload:card )}; 
      default: return state;
    }
    }
    export default reducer;