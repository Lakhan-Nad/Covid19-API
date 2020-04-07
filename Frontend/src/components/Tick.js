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
          <Statistic.Value>{this.state.active}</Statistic.Value>
          <Statistic.Label>
            <span style={{ color: A_COLOR }}>Active</span>
          </Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{this.state.recovered}</Statistic.Value>
          <Statistic.Label>
            <span style={{ color: R_COLOR }}>Recovered</span>
          </Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{this.state.died}</Statistic.Value>
          <Statistic.Label>
            <span style={{ color: D_COLOR }}>Died</span>
          </Statistic.Label>
        </Statistic>
      </Statistic.Group>
    );
  }
}
