import React from "react";
import PieChart from "react-minimal-pie-chart";
import { Modal, Container, Row, Col } from "react-bootstrap";

class SearchResults extends React.Component {
  state = {
    show: false,
    selectedPlanet: null
  };
  calculatePercent = (unitPopulation, totalPopulation) => {
    var value = !isNaN((unitPopulation * 100) / totalPopulation)
      ? ((unitPopulation * 100) / totalPopulation).toFixed(2)
      : 0.0;
    return Number(value);
  };
  handleShow = selectedPlanet => {
    this.setState({
      show: true,
      selectedPlanet
    });
  };
  handleClose = () => {
    this.setState({
      show: false
    });
  };
  renderResults = () => {
    if (this.props.data) {
      var maxPopulation =
        this.props.data.results &&
        this.props.data.results.reduce(
          (a, b) => a + (parseInt(b.population, 10) || 0),
          0
        );
      return (
        this.props.data.results &&
        this.props.data.results.map((item, index) => {
          return (
            <Col sm key={index}>
              <div
                className="chart"
                onClick={() => {
                  this.handleShow(index);
                }}
              >
                <PieChart
                  data={[
                    {
                      value: index,
                      key: item.name,
                      color: "#E38627"
                    }
                  ]}
                  reveal={this.calculatePercent(item.population, maxPopulation)}
                  lineWidth={20}
                  background="#bfbfbf"
                  lengthAngle={270}
                  rounded
                  animate
                />
                <div>{item.name}</div>
              </div>
            </Col>
          );
        })
      );
    }
    return null;
  };
  renderModal = () => {
    if (this.state.selectedPlanet !== null) {
      const planet = this.props.data.results[this.state.selectedPlanet];
      return (
        <React.Fragment>
          <Modal.Header closeButton>
            <Modal.Title>{planet.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={3} className="modalContent">Rotation Period : {planet.rotation_period}</Col>
                <Col md={3} className="modalContent">Orbital Period : {planet.orbital_period}</Col>
                <Col md={3} className="modalContent">Diameter : {planet.diameter}</Col>
                <Col md={3} className="modalContent">Climate: {planet.climate}</Col>
                <Col md={3} className="modalContent">Gravity : {planet.gravity}</Col>
                <Col md={3} className="modalContent">Terrain : {planet.terrain}</Col>
                <Col md={3} className="modalContent">Surface Water : {planet.surface_water}</Col>
                <Col md={3} className="modalContent">Population : {planet.population}</Col>
              </Row>
            </Container>
          </Modal.Body>
        </React.Fragment>
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>{this.renderResults()}</Row>
        </Container>
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          {this.renderModal()}
        </Modal>
      </React.Fragment>
    );
  }
}
export default SearchResults;
