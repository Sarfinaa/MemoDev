import {CREATE} from '../constants/actionTypes';
const reducer =(state={//isLoading:true,
    cards:[]},action)=>{
    switch(action.type){
    //   case START_LOADING: return {...state,isLoading:true};
    //   case END_LOADING : return  {...state,isLoading:false};
    //   case FETCH_BY_SEARCH: return {...state,cards:action.payload};
    //   case FETCH_POST: return {...state,post:action.payload};
    
        // case FETCH_ALL: return{
        //   ...state,
        //  cards:action.payload.data,
        //  currentPage:action.payload.currentPage,
        //  numberOfPages:action.payload.numberOfPages
        // } 
        case CREATE: return {...state,cards:[...state.cards,action.payload]};
        // case DELETE: return {...state,cards:state.cards.filter(post=>post._id!==action.payload)};
        // case LIKE: return {...state,cards:state.cards.map((post)=>post._id===action.payload._id?action.payload:post )}; 
        // case UPDATE: 
        //    return {...state,cards:state.cards.map((post)=>post._id===action.payload._id?action.payload:post )}; 
      default: return state;
    }
    }
    export default reducer;