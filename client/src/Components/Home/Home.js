import React,{useEffect} from "react";
import "./home.css";
import HeroSection from "../HeroSection";
import {  useDispatch} from "react-redux";
import { getCards } from '../../actions/cards';
import { BrowserRouter as Router } from "react-router-dom";

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
