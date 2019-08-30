import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText, CardLink } from "reactstrap";
import renderHTML from "react-render-html";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";

/*
 * Displays the content of the individual feed item
 */
class FeedItemContent extends Component {
  
  /*
   * Render the title of theitem content
   */
  renderItemTitle = itemContent => {
    if (!itemContent.title) {
      return null;
    }
    return (
      <div>
        <CardTitle>{itemContent.title}</CardTitle>
        <hr />
      </div>
    );
  };

  /*
   * Render the link back to the item content
   */
  renderItemLink = itemContent => {
    if (!itemContent.link) {
      return null;
    }
    return (
      <div>
        <CardLink href={itemContent.link}>Visit Site</CardLink>
        <hr />
      </div>
    );
  };

  /*
   * Render the html content for the selected item
   */
  renderItemContent = itemContent => {
    if (!itemContent.description) {
      return null;
    }
    return (
      <div>
        {renderHTML(itemContent.description)};
        <hr />
      </div>
    );
  };

  render() {
    return (
      <Card id="content-card">
        <CardBody id="content-body">
          {isEmpty(this.props.feedItemContent) ? (
            <CardText>Select a feed item to see its content</CardText>
          ) : (
            <div>
              {this.renderItemTitle(this.props.feedItemContent)}
              {this.renderItemLink(this.props.feedItemContent)}
              {this.renderItemContent(this.props.feedItemContent)}
            </div>
          )}
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  feedItemContent: state.feeds.feedItemContent
});

export default connect(
  mapStateToProps,
  null
)(FeedItemContent);
