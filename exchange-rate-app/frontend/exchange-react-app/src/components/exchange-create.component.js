import React, { Component } from "react";
import axios from "axios";

export default class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeBuyTime = this.onChangeBuyTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      form_currency: "BTC",
      form_date: "20180507",
      //form_buyTime: "0915",
      buyPrice: "",
      sellTime: "",
      sellPrice: "",
      profit: ""
    };
  }
  handleChange(event) {
    this.setState({ form_buyTime: event.target.value });
  }

  onChangeFunc(event) {
    this.setState({ form_buyTime: event.target.value });
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  }

  onChangeCurrency(e) {
    this.setState({
      form_currency: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
      form_date: e.target.value
    });
  }

  onChangeBuyTime(e) {
    this.setState({
      form_buyTime: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newData = {
      form_currency: this.state.form_currency,
      form_date: this.state.form_date,
      form_buyTime: this.state.form_buyTime
    };

    console.log(newData.form_currency);
    console.log(newData.form_date);
    console.log(newData.form_buyTime);

    axios
      .get(
        "http://localhost:4000/api/getRates/" +
          newData.form_currency +
          "/" +
          newData.form_date +
          "/" +
          newData.form_buyTime
      )
      .then(res => {
        this.setState({
          form_currency: res.data.currency,
          form_date: res.data.date,
          buyTime: res.data.buyTime,
          buyPrice: res.data.buyPrice,
          sellTime: res.data.sellTime,
          sellPrice: res.data.sellPrice,
          profit: res.data.profit
        });

        console.log(res.data);
      });
  }
  // reset() {
  //   this.setState({
  //     form_currency: "BTC",
  //     form_date: "20180507",
  //     form_buyTime: "0915"
  //   });
  // }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Enter the Data for Best Sell Time</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Currency : </label>
            <input
              type="textfield"
              className="form-control"
              minLength={3}
              maxLength={3}
              size={10}
              required
              value={this.state.form_currency}
              onChange={this.onChangeCurrency}
            />
          </div>
          <div className="form-group">
            <label>Date (YYYYMMDD): </label>
            <input
              type="text"
              minLength={8}
              maxLength={8}
              size={10}
              required
              className="form-control"
              value={this.state.form_date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <label>
              Buy Time (HHMM):
              <select
                name="select-time"
                value={this.state.buyTime}
                onChange={this.handleChange}
              >
                <option value="0900">0900</option>
                <option value="0915">0915</option>
                <option value="0930">0930</option>
                <option value="1030">1030</option>
                <option value="1045">1045</option>
                <option value="1115">1115</option>
                <option value="1230">1230</option>
                <option value="1245">1245</option>
                <option value="1400">1400</option>
                <option value="1515">1515</option>
                <option value="1530">1530</option>
                <option value="1700">1700</option>
              </select>
            </label>
          </div>
          {/* <div className="form-group">
            <label>Buy Time (HHMM): </label>
            <input
              type="text"
              className="form-control"
              minLength={4}
              maxLength={4}
              size={10}
              required
              value={this.state.form_buyTime}
              onChange={this.onChangeBuyTime}
            />
          </div> */}
          <div className="form-group">
            <input type="submit" value="SUBMIT" className="btn btn-primary" />
          </div>
        </form>
        <form>
          <h1>Currency Rates and Profit</h1>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Date</th>
                <th>Buy Time</th>
                <th>Buy Price</th>
                <th>Sell Time</th>
                <th>Sell Price</th>
                <th>Profit</th>
              </tr>
              <tr>
                <td>{this.state.form_currency}</td>
                <td>{this.state.form_date}</td>
                <td>{this.state.buyTime}</td>
                <td>{this.state.buyPrice}</td>
                <td>{this.state.sellTime}</td>
                <td>{this.state.sellPrice}</td>
                <td>{this.state.profit}</td>
              </tr>
            </thead>
          </table>
        </form>
      </div>
    );
  }
}
