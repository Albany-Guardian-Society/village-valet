import React, { Component } from 'react';
import { connect } from "react-redux";

import {ButtonToolbar, InputGroup, FormControl} from "react-bootstrap";
import {Row} from "react-bootstrap";


class SearchBar extends Component {
    render() {
        return (
            <Row  style={{float:"right", paddingRight: "5px"}}>
                <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="btnGroupAddon">Search</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="text"
                            placeholder="Type in a name..."
                            aria-label="Input group example"
                            aria-describedby="btnGroupAddon"
                        />
                    </InputGroup>
                </ButtonToolbar>
            </Row>
        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
