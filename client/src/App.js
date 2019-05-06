import React, { Component, Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import history from "./utils/historyUtils";

import Header from "./components/layout/Header";
import FeedReader from "./components/feeds/FeedReader";
import ManageFeeds from "./components/feeds/ManageFeeds";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Fragment>
            <Header />
            <Switch>
              <Route exact path="/" component={FeedReader} />
              <Route exact path="/feeds" component={ManageFeeds} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
