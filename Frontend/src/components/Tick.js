import React from "react";
import { A_COLOR, D_COLOR, R_COLOR } from "../helpers/constant";
import Client from "../helpers/client";
import { Statistic } from "semantic-ui-react";

export default class Tick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: null,
      active: 0,
      recovered: 0,
      died: 0,
    };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  update() {
    Client.get("/victim/stats/total").then((res) => {
      if (res.status < 400 && res.data.status === "OK") {
        this.setState({
          timeout: setTimeout(this.update, 3000),
          active: res.data.data.active,
          recovered: res.data.data.recovered,
          died: res.data.data.died,
        });
      } else {
        this.setState({
          timeout: setTimeout(this.update, 3000),
        });
      }
    });
  }

  render() {
    return (
      <Statistic.Group widths="3">
        <Statistic>
          <Statistic.Value>
            <span style={{ color: A_COLOR }}>{this.state.active}</span>
          </Statistic.Value>
          <Statistic.Label>Active</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <span style={{ color: R_COLOR }}>{this.state.recovered}</span>
          </Statistic.Value>
          <Statistic.Label>Recovered</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <span style={{ color: D_COLOR }}>{this.state.died}</span>
          </Statistic.Value>
          <Statistic.Label>Died</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    );
  }
}
