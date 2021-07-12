import React,{useState,useEffect} from 'react';
import './App.css';
import Home from './Components/Home/Home';
import NavBar from './Components/Navbar/index';
import New from './Components/New/New';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Cards from './Components/Cards/Cards';
import Auth from './Components/Auth/Auth';
import Training from './Components/Training/Training';

function App() {
  const [users,setUsers]=useState(null)
      const user=JSON.parse(localStorage.getItem('profile'));
useEffect(()=>{
  setUsers(user);
},[users])
  return (
    <Router>
       <NavBar/>
       <Switch>
           <Route path='/' exact component={()=><Redirect to="/Home"/>}/>
           <Route path='/Home' exact component={ ()=>(!users?<Home/>:<Redirect to="/cards"/>)}/>
           <Route path='/New' exact component={New}/>
           <Route path='/Cards' exact component={Cards}/>
           <Route path='/auth' exact component={ ()=>(!users?<Auth/>:<Redirect to="/cards"/>)}/>
           <Route path='/Train' exact component={Training}/>
           
       </Switch>
        
        </Router>
  );
}

export default App;
