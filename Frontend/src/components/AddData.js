import React from "react";
import Client from "../helpers/client";
import { Grid, Button, Header, Icon, Message } from "semantic-ui-react";
import { InputSimple, SelectWithAddition, SelectSimple } from "./input";
import { commonSymptoms, genderList, status } from "../helpers/options";
import { stateOptions } from "../helpers/stateList";
import TravelHistory from "./TravelHistoryInput";
import errorText from "../helpers/error";

class VictimForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: true,
      data: null,
      error: false,
    };
    this.data = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let url = "/victim";
    if (this.props.update) {
      url += "/" + this.props.id;
    }
    this.setState({ submit: false });
    Client.post(url, this.data)
      .then((res) => {
        if (
          res.status < 400 &&
          ((!this.props.update &&
            res.data.status === "SUCCESSFULLY_INSERTED") ||
            res.data.status === "SUCCESSFULLY_UPDATED")
        ) {
          window.location.href =
            "/data/" +
            ((this.props.update && res.data.data._id) || res.data._id);
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        this.setState({
          submit: true,
          error: true,
          data: errorText(err),
        });
      });
  }

  render() {
    return (
      <>
        <Header content="Add new data" textAlign="left" size="huge" dividing />
        <Grid textAlign="center">
          <Grid.Column width="8" textAlign="left">
            <SelectSimple
              placeholder="Status"
              label="Status"
              default={this.props.update ? this.props.default.status : ""}
              name="status"
              data={this.data}
              options={status}
            />
            <br />
            <br />
            <InputSimple
              type="number"
              placeholder="Age"
              label="Age"
              default={this.props.update ? this.props.default.age : ""}
              data={this.data}
              name="age"
              min="0"
            />
            <br />
            <br />
            <SelectSimple
              placeholder="Gender"
              label="Gender"
              default={this.props.update ? this.props.default.gender : ""}
              data={this.data}
              name="gender"
              options={genderList}
            />
            <br />
            <br />
            <InputSimple
              type="text"
              placeholder="Place"
              label="Place"
              default={this.props.update ? this.props.default.place : ""}
              data={this.data}
              name="place"
            />
            <br />
            <br />
            <SelectSimple
              placeholder="State"
              label="State"
              default={this.props.update ? this.props.default.state : ""}
              data={this.data}
              name="state"
              options={stateOptions}
            />
            <br />
            <br />
            <InputSimple
              type="text"
              placeholder="Occupation"
              label="Occupation"
              default={this.props.update ? this.props.default.occupation : ""}
              data={this.data}
              name="occupation"
            />
            <br />
            <br />
            <InputSimple
              type="text"
              placeholder="Test Center"
              label="Test Center"
              default={this.props.update ? this.props.default.testCenter : ""}
              data={this.data}
              name="testCenter"
            />
            <br />
            <br />
            <SelectWithAddition
              placeholder="Symptoms"
              label="Symptoms"
              default={this.props.update ? this.props.default.symptoms : ""}
              name="symptoms"
              data={this.data}
              options={commonSymptoms}
              multiple
            />
          </Grid.Column>
          <Grid.Column width="8" textAlign="left">
            <TravelHistory
              default={
                this.props.update ? this.props.default.travelHistory : []
              }
              name="travelHistory"
              data={this.data}
            />
          </Grid.Column>
          <Grid.Column textAlign="center" width="16">
            <Button
              role="submit"
              size="medium"
              disabled={!this.state.submit}
              content="Submit Data"
              primary
              onClick={this.handleSubmit}
              loading={!this.state.submit}
            />
          </Grid.Column>
        </Grid>
        {this.state.error && (
          <Message
            error
            header="Error"
            icon={<Icon name="warning circle" />}
            content={this.state.data}
          />
        )}
      </>
    );
  }
}

export default VictimForm;
