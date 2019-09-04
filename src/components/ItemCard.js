import React from 'react'
import './css/ItemCard.css'

const ItemCard = (props) => {
    return(
        <div id="itemCard" className="ui card">
            <div id="flex">
            <div className="header">
                <h5>{props.itemData.name}</h5>
            </div>
            <div className="content">
                <div className="frame">
                <img src={props.itemData.imageUrl} alt={props.itemData.name} />
                </div>
                <span>${props.itemData.price}</span>
                <br></br>
                <span>Morale Boost: {props.itemData.boost}</span>
            </div>
                <button className="ui button" onClick={(e)=>props.buyItem(e, props.itemData)}>Buy Item</button>
            </div>
        </div>
    )
}

export default ItemCard