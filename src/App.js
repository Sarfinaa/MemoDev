import './App.css';
import Home from './Components/Home/Home';
import NavBar from './Components/Navbar/index';
import New from './Components/New/New';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Cards from './Components/Cards/Cards';
function App() {
  return (
    <Router>
       <NavBar/>
       <Switch>
           <Route path='/' exact component={()=><Redirect to="/Home"/>}/>
           <Route path='/Home' exact component={Home}/> 
           <Route path='/New' exact component={New}/>
           <Route path='/Cards' exact component={Cards}/>

       </Switch>
        
        </Router>
  );
}

export default App;
