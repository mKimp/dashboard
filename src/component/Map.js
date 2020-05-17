import React from 'react'
import {ReactDOM} from 'react-dom'
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import './Map.css'
import data from './data/data.json';


class Mapp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            totaldata: this.props.totaldata
        }
    }



    render() {
        // const coordinates = this.state.coordinates;
        // const search = this.props.searchName;
        // console.log(data)
        const aa = data.map((item) => item.states[0].title)
        console.log(aa)
        let newArray = []
        const current = data.filter(function (item) {
            return item.states[0].title === this.props.searchName
        })
        current.forEach((element) => {
            const title = element.title
            const cood = element.coordinates
            const newData = {
                "title": title,
                "cood": [cood.latitude, cood.longitude]
            };
            newArray.push(newData)

        })
        console.log(newArray[0].cood)

        const lat = newArray[0].cood[0];
        const long = newArray[0].cood[1];
        //     this.state.coodLabell.map(element => {
        //        console.log(element)
        //    });
        return (
            <Map center={
                    [lat, long]
                }
                zoom={6}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/> {
                newArray.map((item) => <Marker key={
                        item.cood[0]
                    }
                    position={
                        [
                            item.cood[0], item.cood[1]
                        ]
                }>
                    <Popup position={
                        [
                            item.cood[0], item.cood[1]
                        ]
                    }>
                        <div>
                            <h4>{
                                item.title
                            }</h4>
                        </div>
                    </Popup>
                </Marker>)
            } </Map>
        )
    }
}
/*
<Map center={[lat,long]} zoom={6}>
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
/> 
{coodLabell.map((item) => <Marker key={item.title} position={[item.cood[0], item.cood[1]]}> 

</Marker>)}             

</Map>*/
//        <Popup position={[cood.latitude, cood.longitude]}> <div><h2></h2></div> </Popup>


export default Mapp;
