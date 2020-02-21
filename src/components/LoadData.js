import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

class LoadData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            message: "",
        };
    }

	componentDidMount() {
        //Load the villages
        this.setState({message: "Loading Village"});
        firestore.collection("villages").get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            this.props.load("villages", data);
        }).then(() => {
            this.setState({status: 20});
        }).then(() => {
            //The master admin account should surpase village designation!
            //if the admin account is used then do not use the .where(village_id)
            if (this.props.village_id === "admin") {
                //Load the Users
                this.setState({message: "Loading Users"});
                firestore.collection("users").get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    this.props.load("users", data);
                }).then(() => {
                    this.setState({status: 60});
                }).then(() => {
                    //Load the Rides
                    this.setState({message: "Loading Rides"});
                    firestore.collection("rides").get()
                    .then(querySnapshot => {
                        const data = querySnapshot.docs.map(doc => doc.data());
                        this.props.load("rides", data);
                    }).then(() => {
                        this.setState({status: 100});
                    }).then(() => {
                        this.props.load("loaded", true);
                    })
                })
            } else {
                //Load the Users
                this.setState({message: "Loading Users"});
                firestore.collection("users").where("village_id", "==", this.props.village_id).get()
                .then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    this.props.load("users", data);
                }).then(() => {
                    this.setState({status: 60});
                }).then(() => {
                    //Load the Rides
                    this.setState({message: "Loading Rides"});
                    firestore.collection("rides").where("village_id", "==", this.props.village_id).get()
                    .then(querySnapshot => {
                        const data = querySnapshot.docs.map(doc => doc.data());
                        this.props.load("rides", data);
                    }).then(() => {
                        this.setState({status: 100});
                    }).then(() => {
                        this.props.load("loaded", true);
                    })
                })
            }
        })
    }

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

const mapStateToProps = state => ({
    village_id: state.operator.village_id
});

const mapDispatchToProps = dispatch => ({
    load: (tag, data) => dispatch({
        type: "load",
        payload: {
            tag: tag,
            data: data
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadData);
