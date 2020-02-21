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

    getRiders() {
        let k = 0
        let riders = this.props.users.filter((user) => {
            return (user.user_type === "rider")
        }).map((rider) => {
            k++;
            return(
                <tr key={k}>
                    <td>:)</td>
                    <td>{rider.personal_info.first_name}</td>
                    <td>{rider.personal_info.last_name}</td>
                    <td>{rider.village_id}</td>
                    <td>Active</td>
                </tr>
            );
        })

        return riders;
    }

    render() {
        return (
            <Container className="SelectRider" style={{minWidth: "100%"}}>
                <h1>Select Rider</h1>
                <Row>
                    <Col sm={10}><Form.Control type="search" id="search" placeholder="Search" onChange={this.handleChange}/></Col>
                    <Col sm={2}>
                        <Button id="search_button" onClick={this.handleSearch}>
                            Search
                        </Button>
                    </Col>
                </Row>
                <hr/>
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
                        {this.getRiders()}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectRider);
