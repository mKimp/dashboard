import React from 'react'
import {ReactDOM} from 'react-dom'
import { Map,TileLayer, Marker, Popup } from "react-leaflet";
import './Map.css'


class Mapp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {coordinates: this.props.coordinates}
  }

  render(){
      const coordinates = this.state.coordinates;
      return(
        <Map center={[45.523064, -122.676483]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        /> 
        {coordinates.map((cood)=> <Marker key={cood.latitude} position={[cood.latitude, cood.longitude]} ></Marker>)}
  

      </Map>)
  }
}

export default Mapp;