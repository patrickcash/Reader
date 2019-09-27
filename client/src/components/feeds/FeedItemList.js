import React, { Component } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import { connect } from "react-redux";
import { getItemContent } from "../../actions/feeds";
import isEmpty from "lodash/isEmpty";

/*
 * Displays all of the items available for the selected feed
 */
class FeedItemList extends Component {
  constructor() {
    super();
    this.state = {
      activeFeedItem: 0
    };
  }

  /*
   * Select the first item in the feed to display the content of that item in the item content card
   */
  componentDidUpdate(prevProps) {
    if (prevProps.feedItems !== this.props.feedItems) {
      this.props.getItemContent(0);
      if (this.state.activeFeedItem !== 0) {
        this.setState({ activeFeedItem: 0 });
      }
    }
  }

  /*
   * Display the content of the selected item in the item content card
   */
  handleFeedItemClick = index => {
    this.props.getItemContent(index);
    this.setState({ activeFeedItem: index });
  };

  renderFeedItems = feedItems => {
    return feedItems.map((item, index) => (
      <ListGroupItem
        className="feed-item"
        key={"item" + index}
        active={index === this.state.activeFeedItem}
        onClick={() => this.handleFeedItemClick(index)}
      >
        <ListGroupItemHeading id="feed-item-heading">
          {item.title}
        </ListGroupItemHeading>
        {item.author && (
          <ListGroupItemText id="feed-item-author">
            Author: {item.author}
          </ListGroupItemText>
        )}
      </ListGroupItem>
    ));
  };

  render() {
    return (
      <Card id="item-card">
        {isEmpty(this.props.feedItems) ? (
          <ListGroup id="item-list">
            <ListGroupItem id="feed-item">Select a feed</ListGroupItem>
          </ListGroup>
        ) : (
          <ListGroup id="item-list">
            {this.renderFeedItems(this.props.feedItems)}
          </ListGroup>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  feedItems: state.feeds.feedItems
});

export default connect(
  mapStateToProps,
  { getItemContent }
)(FeedItemList);
