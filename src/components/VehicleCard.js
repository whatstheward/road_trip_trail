import React from 'react'

const VehicleCard = (props) => {
    return(
        <div className="ui card" >
            <div className="content">
                <div className="header">
                    {props.vehicle.make + " " + props.vehicle.model}
                </div>
                <img style={{width: '10em'}} src="https://www.driven.co.nz/media/132850/40ee258200000578-4556492-image-a-47_1496175629749.jpg?width=820" />
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