import React from 'react'
import "./Card.css"

function Card({card}) {
    console.log(card);
    return (
        <>
            <div className="cards-component">
                <h2 className="component-heading">{card.wul}</h2>
                <p>{card.language}</p>
            </div>
        </>
    )
}

export default Card
