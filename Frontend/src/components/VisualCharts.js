import React from "react";
import Client from "../helpers/client";
import { formatData, formatStateData } from "../charts/format";
import {
  Message,
  Icon,
  Loader,
  Button,
  Container,
  Header,
} from "semantic-ui-react";
import { LineChart, AreaChart, BarChart } from "../charts/chart";
import { SelectSimple, InputSimple } from "./input";
import { stateOptions } from "../helpers/stateList";
import { localDateString } from "../helpers/date";

export default class VisualCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: null,
      from: "",
      to: "",
      state: "",
    };
    this.data = { from: "", to: "", state: "" };
    this.fetchData = this.fetchData.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  updateState() {
    this.fetchData();
    this.setState({
      loading: true,
      error: null,
    });
  }

  fetchData() {
    let from = this.data.from;
    let to = this.data.to;
    let state = this.data.state;
    let url = "/stats/date";
    if (this.props.cumulative) {
      url += "/cumulative";
    } else if (this.props.state) {
      url = "/stats/date/cumulative";
    }
    let params = {};
    if (from !== "") {
      params.beginDate = from;
    }
    if (to !== "") {
      params.endDate = to;
    }
    if (this.props.state && state !== "") {
      params.state = state;
    }
    Client.get(url, {
      params: params,
    })
      .then((res) => {
        if (res.status < 400 && res.data.status === "OK") {
          this.setState({
            state: state,
            from: from,
            to: to,
            loading: false,
            data: this.props.state
              ? formatStateData(res.data.data)
              : formatData(res.data.data),
          });
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error:
            typeof err === "object" && err.status
              ? err.status + (err.message ? ": " + err.message : "")
              : JSON.stringify(err),
        });
      });
  }

  render() {
    return (
      <>
        <Header
          dividing
          content={
            this.props.state
              ? "Statewise new cases"
              : this.props.cumulative
              ? "Datewise total cases"
              : "Datewise new cases"
          }
          size="huge"
          style={{ marginTop: "0" }}
        />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {!this.props.state && (
            <SelectSimple
              options={stateOptions}
              label="Select State"
              name="state"
              default={this.state.state}
              data={this.data}
              clearable
            />
          )}
          <InputSimple
            type="date"
            placeHolder="Begin Date"
            label="Select Begin Date"
            name="from"
            default={this.state.from}
            data={this.data}
          />
          <InputSimple
            type="date"
            placeHolder="End Date"
            label="Select End Date"
            name="to"
            default={this.state.to}
            data={this.data}
          />
          <Button
            loading={this.state.loading}
            disabled={this.state.loading}
            content="Update Chart"
            onClick={this.updateState}
          />
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
                content={this.state.error}
                onDismiss={() => {
                  this.setState({ error: false });
                }}
              />
            </Container>
          )}
          {!this.state.data ? (
            this.state.loading ? (
              <Loader active content="Loading.." size="massive" />
            ) : null
          ) : this.props.state ? (
            <BarChart
              categories={this.state.data[0]}
              series={this.state.data[1]}
              height="600px"
              width="750px"
              title={
                "New Cases from " +
                (this.state.from === ""
                  ? "..."
                  : localDateString(this.state.from)) +
                " - " +
                (this.state.to === "" ? "..." : localDateString(this.state.to))
              }
            />
          ) : this.props.cumulative ? (
            <LineChart
              labels={this.state.data[0]}
              series={this.state.data[1]}
              height="600px"
              width="750px"
              title={
                this.state.state === ""
                  ? "Data for all states"
                  : "Data for " + this.state.state
              }
            />
          ) : (
            <AreaChart
              labels={this.state.data[0]}
              series={this.state.data[1]}
              height="600px"
              width="750px"
              title={
                this.state.data === ""
                  ? "Data for all the States"
                  : "Data for " + this.state.state
              }
            />
          )}
        </div>
      </>
    );
  }
}
