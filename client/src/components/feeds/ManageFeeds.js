import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { getFeeds, addFeed, deleteFeed } from "../../actions/feeds";
import PropTypes from "prop-types";

/*
 * UI for adding and deleting feeds
 */
class ManageFeeds extends Component {
  state = {
    name: "",
    url: ""
  };

  static propTypes = {
    getFeeds: PropTypes.func.isRequired,
    addFeed: PropTypes.func.isRequired,
    deleteFeed: PropTypes.func.isRequired,
    feeds: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getFeeds();
  }

  onDeleteClick = id => {
    this.props.deleteFeed(id);
  };

  // update name and url value any time field is changed
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // on Add Feed click
  onSubmit = e => {
    e.preventDefault();

    const newFeed = {
      name: this.state.name,
      url: this.state.url
    };

    this.props.addFeed(newFeed);
  };

  render() {
    const { feeds } = this.props.feeds;
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="name">Add Feed</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={this.onChange}
            />
            <Input
              style={{ marginTop: "0.5rem" }}
              type="text"
              name="url"
              id="url"
              placeholder="URL"
              onChange={this.onChange}
            />
            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Add Feed
            </Button>
          </FormGroup>
        </Form>
        <h4 style={{ marginTop: "2rem" }}>Feeds:</h4>
        <ListGroup>
          {feeds.map(({ _id, name }) => (
            <ListGroupItem key={_id}>
              {name}
              <span className="float-right">
                <Button
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, _id)}
                >
                  &times;
                </Button>
              </span>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  feeds: state.feeds
});

export default connect(
  mapStateToProps,
  { getFeeds, addFeed, deleteFeed }
)(ManageFeeds);
