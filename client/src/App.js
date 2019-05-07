import React, { Component, Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import history from "./utils/historyUtils";
import { authLogin } from "./actions/auth";

import Header from "./components/layout/Header";
import FeedReader from "./components/feeds/FeedReader";
import ManageFeeds from "./components/feeds/ManageFeeds";
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const token = localStorage.getItem("token");

if (token) {
  store.dispatch(authLogin(token));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Fragment>
            <Header />
            <Switch>
              <PrivateRoute exact path="/" component={FeedReader} />
              <PrivateRoute exact path="/feeds" component={ManageFeeds} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
