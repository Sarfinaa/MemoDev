import React,{useEffect} from 'react'
import Navbar from '../Navbar'
import "./Cards.css"
import Card from './Card/Card'
import { IoMdCreate } from 'react-icons/io';
import {useSelector} from "react-redux";
import { getCards } from '../../actions/cards';
import {  useDispatch} from "react-redux";
function Cards() {
     const dispatch = useDispatch();
  useEffect(()=>{
dispatch(getCards());
  },[dispatch])
    const cards = useSelector(state => state.cards.cards)
    console.log(cards)
    return (
        <div className="whole-container">
            <div>
                <button className="train-btn">
                    Train Now
                </button>
            </div>
            <div className="container-cards">
                <div className="d1">
                    <div className="create-card">
                        <h4>Create new card</h4>
                    </div>
                    <div className="cardholder">
                      {cards.map(card =>(                    
                          <Card key={card._id} i card={card}/>
                      ))}
                   
                    </div>
                </div>
                <div className="d2">
                    <div className="make-function">
                        <h1>make a function</h1>
                        <div className="language">c++</div>
                    </div>
                    <div className="card-btn-container">
                        <button className="card-btn"><IoMdCreate />Edit</button>
                        <button className="card-btn">Delete</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cards
