import React from 'react'

const ItemCard = (props) => {
    return(
        <div className="ui card">
            <div className="header">
                <h3>{props.itemData.name}</h3>
            </div>
            <div className="content">
                <img src=" " alt={props.itemData.name} /><br/>
                <span>${props.itemData.price}</span>
            </div>
                <button className="ui button" onClick={(e)=>props.buyItem(e, props.itemData)}>Buy Item</button>
        </div>
    )
}

export default ItemCard