import React from 'react'
import "./Card.css"

function Card({card,setCurrentId,isActive,setEdit}) {
    return (
        <>
            <div className={`cards-component ${isActive&&'active'}`}onClick={(e) => {
            e.stopPropagation();
            setEdit(false);
            setCurrentId(card._id);
          }}>
                <p className="component-heading">{card.wul}</p>
                <p style={{color: "white"}}>{card.language}</p>
            </div>
        </>
    )
}

export default Card
