import React, { Component } from 'react';
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';

import Row from "react-bootstrap/Row";
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
<<<<<<< HEAD:src/components/profiles/Profile/Profile_Table.js
                            <Button variant="primary" >Contact Info</Button>
=======
                            <Button variant="primary">Contact Info</Button>
>>>>>>> master:src/components/profiles/profile/ProfileContainer.js
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
