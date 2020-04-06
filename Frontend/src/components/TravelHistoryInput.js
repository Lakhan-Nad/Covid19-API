import React from "react";
import { InputSimple } from "./input";
import { Button, Header } from "semantic-ui-react";

export default class TravelHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default
    };
    this.value = JSON.parse(JSON.stringify(this.props.default));
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
  }

  update() {
    this.props.data[this.props.name] = this.value;
    if (typeof this.props.callOnUpdate === "function")
      this.props.callOnUpdate();
    this.setState({
      value: this.value
    });
  }

  add() {
    this.value.push({ country: "", place: "", from: "", to: "" });
    this.update();
  }

  remove() {
    this.value.pop();
    this.update();
  }

  render() {
    return (
      <>
        <Header content="Travel History" size="large" />
        <Button
          active={this.state.count > 0}
          icon="add"
          onClick={this.add}
          size="medium"
          content="Add a travel history"
        />
        <Button
          active={this.state.count > 0}
          icon="minus"
          onClick={this.remove}
          size="medium"
          content="Remove the last travel history"
        />
        <br />
        <br />
        {this.state.value.map((val, key) => {
          return (
            <React.Fragment key={key}>
              <InputSimple
                default={val.place}
                label="Place"
                placeholder="Place"
                type="text"
                data={val}
                name="place"
                callOnUpdate={this.update}
              />
              <InputSimple
                default={val.country}
                label="Country"
                placeholder="Country"
                type="text"
                data={val}
                name="country"
                callOnUpdate={this.update}
              />
              <InputSimple
                default={val.place}
                label="From"
                type="date"
                data={val}
                name="from"
                callOnUpdate={this.update}
              />
              <InputSimple
                default={val.place}
                label="To"
                type="date"
                data={val}
                name="to"
                callOnUpdate={this.update}
              />
              <br />
              <br />
            </React.Fragment>
          );
        })}
      </>
    );
  }
}
