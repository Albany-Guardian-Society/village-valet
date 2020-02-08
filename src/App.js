import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Container from "react-bootstrap/Container";

import Landing from "./components/Landing.js";
import Navigation from './components/Navigation.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Scheduler from './components/scheduler/Scheduler.js';
import Profiles from './components/profiles/Profiles.js';
import Metrics from './components/metrics/Metrics.js';
import Error from './components/Error.js';

class App extends Component {
    render() {
        return (
            <div>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossorigin="anonymous"
            />
            {true ?
                <div>
            <Navigation />
            <BrowserRouter>
                <Switch>
                    <Route path="/Dashboard" component={Dashboard}/>
                    <Route path="/Scheduler" component={Scheduler}/>
                    <Route path="/Profiles" component={Profiles}/>
                    <Route path="/Metrics" component={Metrics}/>
                    <Route path="/" component={Dashboard}/>
                </Switch>
            </BrowserRouter>
            </div>
            : <Landing/>}
            </div>
        );
    }
}

export default App;
