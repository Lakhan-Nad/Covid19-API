import React from "react";
import Client from "../helpers/client";
import { Header, Container, Message, Icon } from "semantic-ui-react";
import Map from "../map/map";
import errorText from "../helpers/error";

export default class MapData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      error: null,
    };
  }

  componentDidMount() {
    Client.get("/victim/stats/map")
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
          error: errorText(err),
        });
      });
  }

  render() {
    return (
      <>
        <Header
          dividing
          size="huge"
          style={{ marginTop: "0" }}
          content="Covid-19 Cases in India"
        />
        <div
          style={{
            height: "600px",
            width: "750px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {!this.state.loading && this.state.error && (
            <Container style={{ position: "absolute", top: "0", left: "0" }}>
              <Message
                size="small"
                header="Error"
                error
                icon={<Icon name="warning circle" />}
                content={
                  <>
                    {this.state.error} <br /> Please Refresh this page.
                  </>
                }
                onDismiss={() => {
                  this.setState({ error: false });
                }}
              />
            </Container>
          )}
          {!this.state.loading && !this.state.error && (
            <Map data={this.state.data} />
          )}
        </div>
      </>
    );
  }
}
