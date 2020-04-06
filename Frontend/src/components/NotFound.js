import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import { useRouteMatch } from "react-router-dom";

function NotFound() {
  return (
    <Segment placeholder attached="bottom">
      <Header icon size="large">
        <Icon name="warning circle" color="red"></Icon>
        <span style={{ color: "red" }}>{useRouteMatch().url}</span> was not
        found.
      </Header>
    </Segment>
  );
}

export default NotFound;
