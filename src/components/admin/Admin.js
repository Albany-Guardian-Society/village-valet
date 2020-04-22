import React, { Component } from 'react';
import { connect } from "react-redux";

import Operator from "./Operator.js";
import Village from "./Village.js";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_village: "",
            show_operator: "",
        };
		this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.debug();
    }

	handleChange(event) {
	}

    showVillage(village) {
        this.setState({show_village: village, show_operator: ""});
        this.props.show("", village);
    }

    showOperator(id, village) {
        this.setState({show_operator: id, show_village: village});
        this.props.show(id, village);
    }

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
        for (let i in this.props.villages) {
            let v = this.props.villages[i];
            rows.push(<ListGroup.Item
                          active={this.state.show_village === v.id}
                          onClick={() => this.showVillage(v.id)}
                          key={v.id}
                      >
                          {v.village_name}
                      </ListGroup.Item>);
        }
        return rows;
    }

    genOperatorRows() {
        let rows = [];
        let villages = Object.keys(this.props.operators);
        if (this.state.show_village !== "") {
            villages = [this.state.show_village];
        }
        for (let v in villages) {
            for (let i in this.props.operators[villages[v]]) {
                let o = this.props.operators[villages[v]][i];
                rows.push(<ListGroup.Item
                              active={this.state.show_operator === o.id}
                              onClick={() => this.showOperator(o.id, villages[v])}
                              key={o.id}
                          >
                              {o.first_name + " " + o.last_name}
                          </ListGroup.Item>);
            }
        }
        return rows;
    }

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
                            <Village show_village={this.state.show_village}/>
                        </Card></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col><Card>
                            <Operator show_village={this.state.show_village} show_operator={this.state.show_operator}/>
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
