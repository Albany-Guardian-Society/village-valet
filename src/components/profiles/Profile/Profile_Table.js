import React, { Component } from 'react';
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container'
// import TableContent from "./TableContent";

class PTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
    }

    render() {
        return (
            <div>
                <Container>
                    {/*onClick={() => table(contact)}*/}
                        <Row>
                            <Button variant="primary" >Contact Info</Button>
                        </Row>

                        <Row>
                            <Button variant="primary">Address Log</Button>
                        </Row>
                        <Row>
                            <Button variant="primary">Special Accommodations</Button>
                        </Row>
                        <Row>
                            <Button variant="primary">Favorite Locations</Button>
                        </Row>

                        <Row>
                            <Button variant="primary">Village Info</Button>
                        </Row>
                        <Row>
                            <Button variant="primary">Preferred Drivers</Button>
                        </Row>
                </Container>
            </div>
        );
    }
}



const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PTable);
