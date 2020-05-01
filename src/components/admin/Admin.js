import React, {Component} from 'react';
import {connect} from "react-redux";

import Operator from "./Operator.js";
import Village from "./Village.js";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

/** @class Admin The admin page component. */
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
    * showVillage sets the selected village
    *
    * @param {string} village The village ID to set as the shown village
    */
    showVillage(village) {
        this.props.show("", village);
    }

    /**
    * showOperator sets the selected operator
    *
    * @param {string} id The id of the operator to be set as shown
    * @param {string} village The village ID to set as the shown village
    */
    showOperator(id, village) {
        this.props.show(id, village);
    }

    /**
    * genVillageRows creates the display for the village rows
    *
    * @return {HTML} List of the villages objects as HTML list items
    */
    genVillageRows() {
        let rows = [];
        rows.push(<Button
                      variant={"light"}
                      onClick={() => this.showVillage("")}
                      key={""}
                  >
                      --Clear Selection--
                  </Button>);
        rows.push(<br key={"break"}/>);
        for (const village of Object.values(this.props.villages)) {
            rows.push(<ListGroup.Item
                active={this.props.show_village === village.id}
                onClick={() => this.showVillage(village.id)}
                key={village.id}
            >
                {village.village_name}
            </ListGroup.Item>);
        }
        return rows;
    }

    /**
    * genOperatorRows creates the display for the operator rows
    *
    * @return {HTML} List of the operator objects as HTML list items
    */
    genOperatorRows() {
        let rows = [];
        let villages = Object.values(this.props.villages)
        if (this.props.show_village !== "") {
            villages = [this.props.villages[this.props.show_village]];
        }
        for (const village of villages) {
            const operators = Object.values(this.props.operators).filter(o => o.village_id === village.id)
            for (const operator of operators) {
                rows.push(<ListGroup.Item
                    active={this.props.show_operator === operator.id}
                    onClick={() => this.showOperator(operator.id, village.id)}
                    key={operator.id}
                >
                    {operator.first_name + " " + operator.last_name}
                </ListGroup.Item>);
            }
        }
        return rows;
    }

    /**
    * render renders the HTML
    *
    * @return {HTML} The HTML visable element
    */
    render() {
        return (
            <Row style={{paddingLeft:"15px", paddingRight:"15px", height: "85vh"}}>
                <Col xs={3} style={{height: "100%"}}>
                    <Card style={{height: "100%"}}>
                        <Card.Header>
                            <h5 style={{float:"left"}}>Villages</h5>
                        </Card.Header>
                        <Card.Body style={{overflow: "scroll"}}>
                            <ListGroup>
                                {this.genVillageRows()}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={3} style={{height: "100%"}}>
                    <Card style={{height: "100%"}}>
                        <Card.Header>
                            <h5 style={{float:"left"}}>Operators</h5>
                        </Card.Header>
                        <Card.Body style={{overflow: "scroll"}}>
                            <ListGroup>
                                {this.genOperatorRows()}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} style={{height: "100%"}}>
                    <Row>
                        <Col><Card>
                            <Village show_village={this.props.show_village}/>
                        </Card></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col><Card>
                            <Operator show_village={this.props.show_village} show_operator={this.props.show_operator}/>
                        </Card></Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    villages: state.villages,
    operators: state.operators,
    show_village: state.admin.show_village,
    show_operator: state.admin.show_operator,
});

const mapDispatchToProps = dispatch => ({
    debug: () => dispatch({
        type: "dump_store",
        payload: null
    }),
    show: (id, village) => dispatch({
        type: "admin_page",
        payload: {
            id: id,
            village: village
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
