import React, { Component } from 'react';
import { connect } from "react-redux";

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
	}

    /**
     * Renders a a new page with an error message
     *
     */

    render() {
        return (
            <div>
                The page you've requested cannot be found.
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
