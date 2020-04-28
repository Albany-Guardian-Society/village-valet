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
    width: 3600,
    margin: '20px',
    '@media orientation: landscape': {
      width: 3600,
    },
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
          total_miles: 0,
          total_time: 0
        };
        this.generateRows = this.generateRows.bind(this);
    }

    generateRows() {
      let ride_ids = Object.keys(this.props.rides);
      let counter = 0;
      let time = 0;
      let miles = 0;
      let rows = ride_ids.filter((ride) => {
          return this.props.rides[ride].driver.id === this.props.driver.id;
      }).map((item) => {
          counter += 1;
          time += this.props.rides[item].ride_data.mileage.driver;
          miles += this.props.rides[item].ride_data.mileage.driver;
          return (
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{counter}</Text>
              </View>
              <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{this.props.rides[item].id}</Text>
              </View>
              <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{this.props.rides[item].ride_data.date}</Text>
              </View>
              <View style={styles.tableCol}>
                  <Text style={(styles.tableCell}>{this.props.rides[item].ride_data.time_total.driver/60).toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{this.props.rides[item].ride_data.mileage.driver}</Text>
              </View>
          </View>
        )});
        if (this.state.total_time !== time || this.state.total_miles !== miles) {
          this.setState({total_time: time, total_miles: miles});
        }
        return rows;
    }

    generateRideTable() {
        return (
          <>
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
            <View>
              {this.generateRows()}
            </View>
            </View>
            <View><Text>{" "}</Text></View>
            <View>
                <Text>{"Totals:"}</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>0</Text>
                  </View>
                  <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>0</Text>
                  </View>
                  <View style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text>
                  </View>
                  <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{this.state.total_time}</Text>
                  </View>
                  <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{this.state.total_miles}</Text>
                  </View>
              </View>
          </View>
        </>);
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
                    <View><Text>{" "}</Text></View>
                    <View>
                        <Text>{this.props.driver.personal_info.last_name + ", " + this.props.driver.personal_info.first_name}</Text>
                        <Text>{this.props.driver.addresses[0].line_1}</Text>
                        <Text>{this.props.driver.addresses[0].city + ", " + this.props.driver.addresses[0].state + " " + this.props.driver.addresses[0].zip}</Text>
                        <Text>{(this.props.driver.personal_info.email ? this.props.driver.personal_info.email + " " : "") + (this.props.driver.personal_info.phone_home ? this.props.driver.personal_info.phone_home + " " : "") + (this.props.driver.personal_info.phone_mobile ? this.props.driver.personal_info.phone_mobile + " " : "")}</Text>
                    </View>
                    <View><Text>{" "}</Text></View>
                    <View>
                        <Text>{"From: [DATE]"}</Text>
                        <Text>{"To: [DATE]"}</Text>
                    </View>
                    <View><Text>{" "}</Text></View>
                    {this.generateRideTable()}
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
