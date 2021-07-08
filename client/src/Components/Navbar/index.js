import React,{useEffect,useState} from "react";
import { FaBars } from "react-icons/fa";
import Cards from "../Cards/Cards";
import {Link,useHistory,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {
   const history=useHistory();
    const location =useLocation();
    const dispatch=useDispatch();
      const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
        const logout=()=>{
          history.push('/');
        dispatch({type:'LOGOUT'});
        setUser(null);
        
      
    }
       useEffect(()=>{
const token=user?.token;
if(token){
    const decodedToken=decode(token);
    //when token expires we logout
    if(decodedToken.exp*1000<new Date().getTime()) logout();
}
setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])

  return (
    <>
      <Nav>
        <NavbarContainer>
        {user?(<NavLogo to="/cards">MemoCode</NavLogo>):(<NavLogo to="/">MemoCode</NavLogo>)}
          <NavMenu>
            <NavItem>
             {user&& <NavLinks to="/Cards">Cards</NavLinks>}
            </NavItem>
            <NavItem>
{user&&<NavLinks to="/Train">Train</NavLinks>}
            </NavItem>
          </NavMenu>
          <NavBtn>
            {user? (
 <NavBtnLink to="/" onClick={logout}>LOGOUT</NavBtnLink>
            ):(
               <NavBtnLink to="/auth">SIGN IN</NavBtnLink>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
