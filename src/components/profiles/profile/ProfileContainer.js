import React, { Component } from 'react';
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button'

import Row from "react-bootstrap/Row";
import Container from 'react-bootstrap/Container'

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
                        <Row>
                            <Button variant="primary">Contact Info</Button>
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
