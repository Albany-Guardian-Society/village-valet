import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import MapContainer from "../google-maps/MapContainer";
import React, {Component} from "react";
import {connect} from "react-redux";


class SelectRider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){

    };

    render() {
        return (
            <Container className="SelectRider" style={{minWidth: "100%"}}>
                <h1>Select Rider</h1>
                <Form>
                    <Form.Control type="search" id="search" placeholder="Search" onChange={this.handleChange}/>
                    <Button id="search_button" onClick={this.handleSearch}>
                        Search
                    </Button>
                </Form>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Picture</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Village</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>:)</td>
                        <td>Garrett</td>
                        <td>Dribusch</td>
                        <td>RPI</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Jeremy</td>
                        <td>Ettlinger</td>
                        <td>RPI</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Mohammad</td>
                        <td>Hamaf</td>
                        <td>RPI</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Matthew</td>
                        <td>Menendez</td>
                        <td>RPI</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Jonathon</td>
                        <td>Schmalz</td>
                        <td>RPI</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Nick</td>
                        <td>Zoner</td>
                        <td>RPI</td>
                        <td>Active</td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectRider);