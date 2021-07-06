import React,{useEffect} from "react";
import "./home.css";
import HeroSection from "../HeroSection";
import { BrowserRouter as Router } from "react-router-dom";
import { getCards } from '../../actions/cards';
import {  useDispatch} from "react-redux";
export default function () {
   const dispatch = useDispatch();
  useEffect(()=>{
dispatch(getCards());
  },[dispatch])
  return (
    <div>
      <Router>
        <HeroSection />
      </Router>
    </div>
  );
}
