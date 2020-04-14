import React, { Component } from 'react';
import { connect } from "react-redux";

import ReactPDF from '@react-pdf/renderer';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const TODAY = new Date();

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'col',
    backgroundColor: '#E4E4E4',
    margin: '20px'
  },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

//PDF
class MileageReportPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    generateRideItems() {
        let myRides = this.props.rides.filter((ride) => {
            return ride.driver.id === this.props.driver.id;
        }).map((item) => {
            return (<tr>
                <td>Hello</td>
            </tr>)
        });
    }

    render() {
        return (
            <Document
                title={this.props.driver.personal_info.last_name + " Mileage Report: "+TODAY.getDate()+(TODAY.getMonth()+1)+TODAY.getFullYear()}
                author="AGS Village Valet"
                creator="AGS Village Valet"
            >
                <Page size="A4" style={styles.page}>
                    <View>
                        <Text>AGS Village Valet - Mileage Report</Text>
                    </View>
                    <View>
                        <Text>{this.props.driver.personal_info.last_name + ", " + this.props.driver.personal_info.first_name}</Text>
                        <Text>{"[Home Address]"}</Text>
                        <Text>{"[Home CSZ]"}</Text>
                        <Text>{(this.props.driver.personal_info.email ? this.props.driver.personal_info.email + " " : "") + (this.props.driver.personal_info.phone_home ? this.props.driver.personal_info.phone_home + " " : "") + (this.props.driver.personal_info.phone_mobile ? this.props.driver.personal_info.phone_mobile + " " : "")}</Text>
                    </View>
                    <View>
                        <Text>{"From: [DATE]"}</Text>
                        <Text>{"To: [DATE]"}</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Item Number</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Ride ID</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Trip Date</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Trip Time</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Trip Mileage</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        )
    }
}

//This is the "rendered component"
class MileageReportButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
    };

    render() {
        return (
          <div>
            <PDFDownloadLink document={<MileageReportPDF driver={this.props.driver} rides={this.props.rides}/>} fileName={this.props.driver.personal_info.last_name + "-M"+TODAY.getDate()+(TODAY.getMonth()+1)+TODAY.getFullYear()}>
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
          </div>
        )
    }
}

const mapStateToProps = state => ({
    driver: state.active_profile,
    rides: state.rides
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MileageReportButton);
