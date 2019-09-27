import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
  };

  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Nav className="ml-auto mt-2 mt-lg-0">
        <NavItem>
          <Link to="/feeds" className="nav-link text-light">
            My Feeds
          </Link>
        </NavItem>
        <NavItem>
          <button
            onClick={this.props.logoutUser}
            className="nav-link btn btn-secondary btn-sm text-light"
          >
            Sign Out
          </button>
        </NavItem>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto mt-2 mt-lg-0">
        <NavItem>
          <Link to="/register" className="nav-link text-light">
            Sign Up
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/login" className="nav-link text-light">
            Sign In
          </Link>
        </NavItem>
      </Nav>
    );

    return (
      <div>
        <Navbar color="success" dark expand="sm">
          <Container>
            <NavbarBrand href="/">Reader</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
