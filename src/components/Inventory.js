import React from 'react'
import './css/Inventory.css'

const Inventory = (props) => {

  return(
    <div className="ui card">
    <h2>Inventory</h2>
    <ul id="itemList">
      {props.items.map(item => <div>{item.name} <button onClick={() => props.useItem(item)}> Use </button> </div>)}
    </ul>
    </div>
  )
}

export default Inventory
