import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

export const Nav = styled.nav`
    background: #000;
    height: 80px;
    /* margin-top: -80px; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
    `;

    export const NavbarContainer = styled.div`
        display: flex;
        justify-content: space-between;
        height: 80px;
        z-index: 1;
        width: 100%;
        max-width: 1300px;
        `;

    export const NavLogo = styled(LinkR)`
     color: #fff; 
     justify-self: flex-start;
     cursor: pointer;
     font-size: 1.5rem;
     display: flex;
     align-items: center;
     margin-right: 40px;
     font-weight: bold;
     text-decoration: none;

    `;

    

    export const NavMenu = styled.ul`
    justify-self: flex-start;
    display: flex;
    align-item: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;

    
    `;

    export const NavItem = styled.li`
    height: 80px;
    `;
    
    export const NavLinks = styled(LinkR)`
      color: #fff;
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0 1rem;
      height: 100%;
      cursor: pointer;

      &.active {
          border-bottom: 3px solid #01bf71;
      }
      `;

     export const NavBtn = styled.nav`
      display: flex;
      margin-left: auto;
      align-items: center;
      
      
      }`;

      export const NavBtnLink = styled(LinkR)`
      border-radius: 50px;
      background: #01bf71;
      white-space: nowrap;
      padding: 10px 22px; 
      color: #010606;
      font-size: 16px;
      outline: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      text-decoration: none;

      
     &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;

      }`;