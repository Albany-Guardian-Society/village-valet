import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapContainer from "../google-maps/MapContainer";

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){

    };

    render() {
        return (
            <Container className="Confirmation" style={{minWidth: "100%"}}>
                <h1>Confirmation</h1>
                <Row>
                    <Col>
                        <MapContainer>Trip Summary</MapContainer>
                    </Col>
                    <Col>
                        <Row>
                            Name:
                        </Row>
                        <Row>
                            PICTURE
                        </Row>
                        <Row>
                            Pickup:
                        </Row>
                        <Row>
                            Dropoff:
                        </Row>
                        <Row>
                            Trip Duration:
                        </Row>
                        <Row>
                            Expected Traffic:
                        </Row>
                        <Row>
                            Driver:
                        </Row>
                        <Row>
                            Return Driver:
                        </Row>
                    </Col>
                </Row>
            </Container>

        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
