import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import "./App.css";

import LoadData from "./components/LoadData.js";

import Navigation from './components/Navigation.js';
import Login from "./components/Login.js";
import Dashboard from './components/dashboard/Dashboard.js';
import Scheduler from './components/scheduler/Scheduler.js';
import Profiles from './components/profiles/Profiles.js';
import Register from './components/profiles/Register.js';
import Profile from './components/profiles/profile/Profile.js';
import Ledger from './components/ledger/Ledger.js'
import Metrics from './components/metrics/Metrics.js';
import Admin from "./components/admin/Admin.js"
import Error from './components/Error.js';
import {LoadScript} from "@react-google-maps/api";
import EditRide from "./components/ledger/EditRide";
import cookie from 'react-cookies'


class App extends Component {

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossOrigin="anonymous"
                    />
                    {!cookie.load('token') ?
                        <Login/> :
                        this.props.loaded ?
                            <div>
                                <LoadScript
                                    id="script-loader"
                                    googleMapsApiKey={cookie.load('googlemapstoken')}
                                    libraries={["places"]}
                                >
                                    <Navigation/>
                                    <Switch>
                                        <Route path="/Dashboard" component={Dashboard}/>
                                        <Route path="/Scheduler" component={Scheduler}/>
                                        <Route path="/Profiles/Register" component={Register}/>
                                        <Route path="/Profiles/User/*" component={Profile}/>
                                        <Route path="/Profiles" component={Profiles}/>
                                        <Route path="/Ledger/EditRide" component={EditRide}/>
                                        <Route path="/Ledger" component={Ledger}/>
                                        <Route path="/Metrics" component={Metrics}/>
                                        <Route path="/Admin" component={Admin}/>
                                        <Route path="/" component={Error}/>
                                    </Switch>
                                </LoadScript>
                            </div>
                            : <LoadData/>}
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.authenticated,
    loaded: state.loaded
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
