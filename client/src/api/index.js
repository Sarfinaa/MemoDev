import axios from 'axios';
const API=axios.create({baseURL:"http://localhost:5000"});
//middleware dont work without it and it happen on each request
API.interceptors.request.use((req)=>{
if(localStorage.getItem('profile')){
    //as we are taking headers.Authorization in auth.js in backend folder
    //adding token to each request
req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
}
return req;
});
export const signIn=(formData)=>API.post('/user/signin',formData);
export const signUp=(formData)=>API.post('/user/signup',formData);
export const createCard=(newCard)=>API.post('/cards',newCard);
