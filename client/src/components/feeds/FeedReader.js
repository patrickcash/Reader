import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import FeedSidebar from "./FeedSidebar";
import FeedItemList from "./FeedItemList";
import FeedItemContent from "./FeedItemContent";

/*
 * Container for the three columns of feed reader components
 */
class FeedReader extends Component {
  render() {
    return (
      <Row>
        <Col md={3} className="sidebar-column">
          <FeedSidebar />
        </Col>
        <Col md={3} className="items-column">
          <FeedItemList />
        </Col>
        <Col md={6} className="content-column">
          <FeedItemContent />
        </Col>
      </Row>
    );
  }
}

export default FeedReader;
