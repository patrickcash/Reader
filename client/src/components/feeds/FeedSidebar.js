import React, { Component } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { getFeeds, getFeedItems } from "../../actions/feeds";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";

/*
 * Displays all of the feeds the user is subscibed to
 */
class FeedSidebar extends Component {
  constructor() {
    super();
    this.state = {
      activeFeedIndex: 0
    };
  }

  static propTypes = {
    getFeeds: PropTypes.func.isRequired,
    getFeedItems: PropTypes.func.isRequired,
    feeds: PropTypes.array.isRequired
  };

  /*
   * Load the initial feed list into the list
   */
  componentDidMount() {
    this.props.getFeeds();
  }

  /*
   * Select to first feed in the list to populate the feed item list
   */
  componentDidUpdate(prevProps) {
    if (isEmpty(prevProps.feeds)) {
      this.props.getFeedItems(this.props.feeds[0].url);
    }
  }

  /*
   * Load the feed items for selected feed
   */
  handleFeedClick = index => {
    this.props.getFeedItems(this.props.feeds[index].url);
    this.setState({ activeFeedIndex: index });
  };

  renderFeeds = feeds => {
    if (feeds) {
      return feeds.map((item, index) => (
        <ListGroupItem
          className="feed pl-5"
          key={index}
          active={index === this.state.activeFeedIndex}
          onClick={() => this.handleFeedClick(index)}
        >
          {item.name}
        </ListGroupItem>
      ));
    }
  };

  render() {
    return (
      <Card id="feed-card">
        <CardHeader className="pl-5 pb-3" id="feed-header">
          Feeds
        </CardHeader>
        {isEmpty(this.props.feeds) ? (
          <ListGroup id="feed-list">
            <ListGroupItem className="feed pl-5">
              Please Use "My Feeds" to add feeds
            </ListGroupItem>
          </ListGroup>
        ) : (
          <ListGroup id="feed-list">
            {this.renderFeeds(this.props.feeds)}
          </ListGroup>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  feeds: state.feeds.feeds
});

export default connect(
  mapStateToProps,
  { getFeeds, getFeedItems }
)(FeedSidebar);
