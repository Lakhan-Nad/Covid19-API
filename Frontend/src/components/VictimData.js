import React from "react";
import Client from "../helpers/client";
import { Message, Icon } from "semantic-ui-react";
import DisplayData from "./DisplayData";

class VictimData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      error: false,
    };
    this.id = this.props.match.params.id;
  }

  componentDidMount() {
    Client.get("/victim/" + this.id)
      .then((res) => {
        if (res.status < 400) {
          this.setState({
            loading: false,
            data: res.data,
          });
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: true,
          data:
            typeof err === "object" && err.status
              ? err.status + (err.message ? ": " + err.message : "")
              : JSON.stringify(err),
        });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <Message
          header="Loading Victim Data"
          icon={<Icon name="circle notched" loading />}
          content="Please wait while we are loading the data."
        />
      );
    } else if (this.state.error) {
      return (
        <Message
          error
          header="Error while loading data."
          icon={<Icon name="warning circle" />}
          content={this.state.data}
        />
      );
    } else {
      return <DisplayData victimData={this.state.data.data} />;
    }
  }
}

export default VictimData;
