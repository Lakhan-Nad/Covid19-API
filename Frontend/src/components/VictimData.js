import React from "react";
import Client from "../helpers/client";
import { Message, Icon, Button } from "semantic-ui-react";
import DisplayData from "./DisplayData";
import VictimForm from "./AddData";

class VictimData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      error: false,
      delete: false,
      failed: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    Client.get("/victim/" + this.props.id)
      .then((res) => {
        if (res.status < 400 && res.data.status === "OK") {
          this.setState({
            loading: false,
            data: res.data.data,
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

  handleDelete() {
    this.setState({
      delete: true,
    });
    Client.delete("/victim/" + this.props.id)
      .then((res) => {
        if (res.status < 400 && res.data.status === "SUCCESSFULLY_DELETED")
          window.location.href = "";
      })
      .catch((err) => {
        this.setState({
          delete: false,
          failed: true,
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
      return this.props.update ? (
        <VictimForm update default={this.state.data} />
      ) : (
        <>
          <DisplayData victimData={this.state.data} id={this.props.id} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              negative
              size="medium"
              disabled={!this.state.delete}
              loading={!this.state.delete}
              content={
                this.state.failed
                  ? "Delete this record"
                  : "Delete failed, Retry"
              }
            />
          </div>
        </>
      );
    }
  }
}

export default VictimData;
