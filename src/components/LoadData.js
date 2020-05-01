import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios"

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import {API_ROOT} from "../modules/api";
import cookie from 'react-cookies'
import * as jwt from "jsonwebtoken"
// Above are all the imports for this file.
// Every file will need React, Component, connect

// The second section of imports are React Bootstrap components.  These allow for easy styling
// and layout without much need for custom CSS or HTML.


/**
 * @class LoadData
 *
 */
class LoadData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            message: "",
        };
    }
    /**
     * Loads all information into to the site on login
     *
     * @example
     *
     */

	componentDidMount() {
        //Load the villages
        const token = cookie.load('token')
        this.setState({message: "Loading Operator"})
        const jwtPayload = jwt.decode(token)
        axios.get(API_ROOT + "/database/operators/self", {
            headers: {
                "Authorization": "BEARER " + token
            }
        }).then((resp) => {
            this.props.updateAuth(resp.data)
            if (jwtPayload.village_id === 'admin') {
                axios.get(API_ROOT + "/database/operators/all", {
                    headers: {
                        "Authorization": "BEARER " + token
                    }
                }).then(response => {
                    let data = {};
                    for (const item of response.data) {
                        data[item.id] = item;
                    }
                    this.props.load("operators", data);
                })
            }
            this.setState({message: "Loading Village"});
            axios.get(API_ROOT + "/database/villages/all", {
                headers: {
                    "Authorization": "BEARER " + token
                }
            }).then(response => {
                let data = {};
                for (const item of response.data) {
                    data[item.id] = item;
                }
                this.props.load("villages", data);
            }).then(() => {
                this.setState({status: 20});
            }).then(() => {
                this.setState({message: "Loading Users"});
                axios.get(API_ROOT + "/database/users/all", {
                    headers: {
                        "Authorization": "BEARER " + token
                    }
                }).then(response => {
                    let data = {};
                    for (const item of response.data) {
                        data[item.id] = item;
                    }
                    this.props.load("users", data);
                }).then(() => {
                    this.setState({status: 60});
                }).then(() => {
                    //Load the Rides
                    this.setState({message: "Loading Rides"});
                    axios.get(API_ROOT + "/database/rides/all", {
                        headers: {
                            "Authorization": "BEARER " + token
                        }
                    }).then(response => {
                        let data = {};
                        for (const item of response.data) {
                            data[item.id] = item;
                        }
                        this.props.load("rides", data);
                    }).then(() => {
                        this.setState({status: 80});
                    }).then(() => {
                        axios.get(API_ROOT + "/admin/googlemaps", {
                            headers: {
                                "Authorization": "BEARER " + token
                            }
                        }).then((response) => {
                            cookie.save('googlemapstoken', response.data.token, {path: '/', maxAge: 3600})
                            cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
                            this.setState({status: 100});
                        }).then(() => {
                            this.props.load("loaded", true);
                        })
                    })
                })
            })
        })
    }
    /**
     * Displays loading bar on page
     *
     * @returns {HTMLDocument}
     *
     */
    render() {
        return (
            <div style={{padding: 100}}>
                <Container>
                    <Card>
                    <Card.Header>Loading...</Card.Header>
                        <Card.Body>
                            <ProgressBar animated now={this.state.status} />
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
/**
 * Pulls village id from state
 *
 */
const mapStateToProps = state => ({
    village_id: state.operator.village_id
});
/**
 * sends login information to the reducer
 *
 */
const mapDispatchToProps = dispatch => ({
    updateAuth: (user) => dispatch({
        type: "authenticate",
        payload: user
    }),
    load: (tag, data) => dispatch({
        type: "load",
        payload: {
            tag: tag,
            data: data
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadData);
