import React from "react";
import Chart from "./Chart";
import Navigation from "./NavigationBar";
import NavigationNoSearch from "./NavigationNoSearch";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import VisitorChart from "./VisitorsChart";
import "./Map.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import PieChart from "./PieChart";
import Park from "./Park";
import Card from "react-bootstrap/Card";
import { searchPark, createWordsTree } from "./helper/extractParkName";
class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkLabel: this.props.dataLabel,
      parkSize: this.props.dataSize,
      searchName: this.props.searchName,
      parkVisitors: this.props.visitors,
      coordinate: this.props.coordinates,
      coodLabell: this.props.coodLabell,
      items: [],
      isSearched: false,
      totalData: this.props.totaldata,
      searchText: "",
      isLoaded: false,
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    createWordsTree();
  }

  handleTextChange(text) {
    const parkName = text.charAt(0).toUpperCase() + text.slice(1);
    console.log("TTLAJADJLAJD ", parkName);
    console.log(searchPark(parkName));
    // this.setState({ searchText: text1 });
  }
  handleSubmit(e) {
    this.setState({ isSearched: true });
  }
  handleSearchChange() {
    this.setState({ isSearched: false });
  }

  render() {
    //get the lat and long of the first national park in the array of parks to get the center for the map
    const lat = this.state.coodLabell[0].cood[0];
    const long = this.state.coodLabell[0].cood[1];
    const parkLength = this.state.parkLabel.length;

    //Park Sizes
    const parkData = new Array(this.state.parkSize.length);
    for (let i = 0; i < this.state.parkSize.length; ++i) {
      const comma = this.state.parkSize[i].replace(/,/g, ""); //Since the data inside the dataset has ',' inside the integer, I have to replace it, so the chart can work properly
      const result = parseFloat(comma);
      parkData[i] = result;
    }

    //Park Visitors
    const visitors = new Array(this.state.parkVisitors.length);
    for (let i = 0; i < this.state.parkVisitors.length; ++i) {
      const comma = this.state.parkVisitors[i].replace(/,/g, ""); //Since the data inside the dataset has ',' inside the float, I have to replace it, so the chart can work properly
      const result = parseInt(comma, 10);
      visitors[i] = result;
    }

    // The dashboard is shown, user has not used the "Searching bar yet", all the charts and map are using cards in bootstraps
    if (!this.state.isSearched) {
      return (
        <React.Fragment>
          <div>
            <Navigation
              textChange={this.state.searchText}
              onTextChange={this.handleTextChange}
              onSubmitChange={this.handleSubmit}
            />
            <div className='park-sugestion-list'></div>
          </div>
          <div
            style={{
              backgroundColor: "DarkOliveGreen",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container>
              <Row>
                <Col>
                  <Card style={{ marginTop: "20px" }}>
                    <Card.Header>
                      {" "}
                      <b>
                        {" "}
                        {this.state.searchName} {"National Parks"}{" "}
                      </b>{" "}
                    </Card.Header>
                    <Card.Body>
                      {
                        <Chart
                          parkLabel={this.state.parkLabel}
                          parkSize={parkData}
                          searchName={this.state.searchName}
                        />
                      }
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ marginTop: "20px" }}>
                    <Card.Header>
                      {" "}
                      <b>Compare to the total of US National Parks </b>{" "}
                    </Card.Header>
                    <Card.Body>
                      <PieChart
                        parkLength={parkLength}
                        totalData={this.state.totalData}
                        searchName={this.state.searchName}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card style={{ marginTop: "20px", height: "370px" }}>
                    <Card.Header>
                      {" "}
                      <b> Amount of Visitors </b>
                    </Card.Header>
                    <Card.Body>
                      <VisitorChart
                        visitors={visitors}
                        parkLabel={this.state.parkLabel}
                        searchName={this.state.searchName}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ marginTop: "20px", height: "370px" }}>
                    <Card.Header style={{ marginBottom: "12px" }}>
                      {" "}
                      <b> Location(s) on Map</b>
                    </Card.Header>

                    <Map center={[lat, long]} zoom={6}>
                      <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      />{" "}
                      {this.state.coodLabell.map((item) => (
                        <Marker
                          key={item.title}
                          position={[item.cood[0], item.cood[1]]}
                        >
                          <Popup position={[item.cood[0], item.cood[1]]}>
                            <div>
                              <h4> {item.title}</h4>
                              <p>
                                <b> Description </b>: {item.description}
                              </p>
                              <p>
                                {" "}
                                <b>Established</b>: {item.established}
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </Map>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <footer style={{ textAlign: "center" }}>
            <p>Author: Kim Ma</p>
            <p>
              <a href='mailto:phuongkim.ma@gmail.com'>phuongkim.ma@gmail.com</a>
            </p>
          </footer>
        </React.Fragment>
      );
    }
    //when the user used the "Search bar", return the information from the search
    else {
      return (
        <React.Fragment>
          <NavigationNoSearch onSearchChange={this.handleSearchChange} />

          <Park
            text={this.state.searchText}
            onSearchChange={this.handleSearchChange}
          />
        </React.Fragment>
      );
    }
  }
}

export default DashBoard;
