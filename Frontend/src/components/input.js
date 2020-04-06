import React from "react";
import { Input, Dropdown } from "semantic-ui-react";

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fn = this.fn.bind(this);
  }
  fn(child) {
    return React.cloneElement(child, {
      data: this.props.data,
      callOnUpdate: this.props.callOnUpdate
    });
  }
  render() {
    let children = React.Children.map(this.props.children, this.fn);
    return <>{children}</>;
  }
}

export class InputSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default
    };
    this.subprops = { ...this.props };
    delete this.subprops.default;
    delete this.subprops.name;
    delete this.subprops.callOnUpdate;
    delete this.subprops.data;
    this.updateState = this.updateState.bind(this);
  }
  updateState(ev, data) {
    this.props.data[this.props.name] = data.value;
    this.setState({ value: data.value });
    if (typeof this.props.callOnUpdate === "function")
      this.props.callOnUpdate();
  }
  render() {
    return (
      <Input
        {...this.subprops}
        value={this.state.value}
        onChange={this.updateState}
      />
    );
  }
}

export class SelectSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default
    };
    this.subprops = { ...this.props };
    delete this.subprops.default;
    delete this.subprops.name;
    delete this.subprops.callOnUpdate;
    delete this.subprops.data;
    delete this.subprops.label;
    delete this.subprops.options;
    this.updateState = this.updateState.bind(this);
  }
  updateState(ev, data) {
    this.props.data[this.props.name] = data.value;
    this.setState({ value: data.value });
    if (typeof this.props.callOnUpdate === "function")
      this.props.callOnUpdate();
  }
  render() {
    return (
      <Input
        label={this.props.label}
        input={
          <Dropdown
            {...this.subprops}
            search
            selection
            labeled
            closeOnChange
            onChange={this.updateState}
            value={this.state.value}
            options={this.props.options}
          />
        }
      />
    );
  }
}

export class SelectWithAddition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default,
      options: this.props.options
    };
    this.subprops = { ...this.props };
    delete this.subprops.default;
    delete this.subprops.name;
    delete this.subprops.callOnUpdate;
    delete this.subprops.data;
    delete this.subprops.label;
    delete this.subprops.options;
    this.updateState = this.updateState.bind(this);
    this.onAddition = this.onAddition.bind(this);
  }
  onAddition(ev, { value }) {
    this.setState({
      options: [
        ...this.state.options,
        { key: value, value: value, text: value }
      ]
    });
  }
  updateState(ev, { value }) {
    this.props.data[this.props.name] = value;
    this.setState({ value: value });
    if (typeof this.props.callOnUpdate === "function")
      this.props.callOnUpdate();
  }
  render() {
    return (
      <Input
        label={this.props.label}
        input={
          <Dropdown
            {...this.subprops}
            search
            selection
            labeled
            closeOnChange
            allowAdditions
            onAddItem={this.onAddition}
            additionPosition="bottom"
            onChange={this.updateState}
            value={this.state.value}
            options={this.state.options}
          />
        }
      />
    );
  }
}
