import React from 'react'
import './css/VehicleCard.css'

const VehicleCard = (props) => {
    return(
        <div className="ui card" >
            <div className="content">
                <div className="header">
                    {props.vehicle.make + " " + props.vehicle.model}
                </div>
                <div id="carBox">
                    <img style={{width: '10em'}} src={props.vehicle.imageUrl} />
                </div>
                <ul>
                    <li>Seats: {props.vehicle.seats}</li>
                    <li>Gas Tank: {props.vehicle.gas} gallons</li>
                </ul>
                <button className="ui button" onClick={(e)=>props.chooseVehicle(e, props.vehicle)}>I'll take this one</button>
            </div>
        </div>
    )
}

export default VehicleCard