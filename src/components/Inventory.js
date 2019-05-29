import React from 'react'
import './css/Inventory.css'

const Inventory = (props) => {

  return(
    <div id="inventoryCard" className="ui card">
    <h2>Inventory</h2>
    <div id="itemList">
      {props.items.map(item => <div>{item.name} <button onClick={() => props.useItem(item)}> Use </button> </div>)}
    </div>
    </div>
  )
}

export default Inventory
