import React, { Component } from 'react';
import { connect } from "react-redux";

import ReactPDF from '@react-pdf/renderer';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import { Text, View, StyleSheet } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const TODAY = new Date();

//This is the "rendered component"
class MileageReport extends Component {
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
            <PDFDownloadLink document={<MyDocument />} fileName={this.props.driver.personal_info.last_name + "-M"+TODAY.getDate()+TODAY.getMonth()+TODAY.getYear()}>
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
          </div>
        )
    }
}

const mapStateToProps = state => ({
    driver: state.active_profile,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MileageReport);
