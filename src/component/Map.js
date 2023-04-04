import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import data from "./data/data.json";

class Mapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totaldata: this.props.totaldata,
    };
  }

  render() {
    let newArray = [];
    const current = data.filter(function (item) {
      return item.states[0].title === this.props.searchName;
    });
    //create the array for coordinates that are responding to each park
    current.forEach((element) => {
      const title = element.title;
      const cood = element.coordinates;
      const newData = {
        title: title,
        cood: [cood.latitude, cood.longitude],
      };
      newArray.push(newData);
    });

    const lat = newArray[0].cood[0];
    const long = newArray[0].cood[1];

    return (
      <Map center={[lat, long]} zoom={6}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />{" "}
        {newArray.map((item) => (
          <Marker key={item.cood[0]} position={[item.cood[0], item.cood[1]]}>
            <Popup position={[item.cood[0], item.cood[1]]}>
              <div>
                <h4>{item.title}</h4>
              </div>
            </Popup>
          </Marker>
        ))}{" "}
      </Map>
    );
  }
}

export default Mapp;
