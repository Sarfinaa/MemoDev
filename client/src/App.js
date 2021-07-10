import './App.css';
import Home from './Components/Home/Home';
import NavBar from './Components/Navbar/index';
import New from './Components/New/New';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Cards from './Components/Cards/Cards';
import Auth from './Components/Auth/Auth';
import NoCard from './Components/NoCards/NoCard';
import Training from './Components/Training/Training';


function App() {
      const user=JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
       <NavBar/>
       <Switch>
           <Route path='/' exact component={()=><Redirect to="/Home"/>}/>
           <Route path='/Home' exact component={ ()=>(!user?<Home/>:<Redirect to="/cards"/>)}/>
           <Route path='/New' exact component={New}/>
           <Route path='/Cards' exact component={Cards}/>
           <Route path='/auth' exact component={ ()=>(!user?<Auth/>:<Redirect to="/cards"/>)}/>
           <Route path='/Train' exact component={Training}/>
           
       </Switch>
        
        </Router>
  );
}

export default App;
