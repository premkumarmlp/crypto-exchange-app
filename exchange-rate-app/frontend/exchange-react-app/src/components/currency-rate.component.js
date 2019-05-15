import React, { Component } from "react";

export default class CurrencyRates extends Component {
  constructor(props) {
    super(props);
    this.state = { rates: [] };
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>
          <center>Welcome To Cryptocurrency Converter Calculator</center>
        </h3>
      </div>
    );
  }
}
