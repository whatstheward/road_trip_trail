import React from 'react'

const Inventory = (props) => {

  return(
    <div>
    <h2>Inventory</h2>
      {props.items.map(item => <li>{item.name} <button onClick={(e) => props.handleClick(item)}> Redeem </button> </li>)}
    </div>
  )
}

export default Inventory
