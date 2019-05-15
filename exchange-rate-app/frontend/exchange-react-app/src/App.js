import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateForm from "./components/exchange-create.component";
import CurrencyRate from "./components/currency-rate.component";

import logo from "./exchange.jpg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a
              class="navbar-brand"
              href="http://middlewareadministration.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo}
                width="150"
                height="150"
                alt="middlewareadministration.blogspot.com"
              />
            </a>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Exchange API Service
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Exchange Form
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
        </div>
        <br />
        <Route path="/" component={CurrencyRate} />
        <Route path="/create" component={CreateForm} />
      </Router>
    );
  }
}

export default App;
