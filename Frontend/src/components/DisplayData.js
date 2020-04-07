import React from "react";
import { Segment, Label, Grid, Header, Icon } from "semantic-ui-react";
import { selectColor } from "../helpers/constant";
import { localDateString, localDateTimeString } from "../helpers/date";
import { A_COLOR, R_COLOR, D_COLOR } from "../helpers/constant";

const labelStyle = {
  fontSize: "1.1em",
};

const dataStyle = {
  fontWeight: "bolder",
  fontSize: "1.2em",
};

function SingleData({ label, data }) {
  return (
    <Grid columns="16" verticalAlign="middle" celled>
      <Grid.Column width="5" style={labelStyle}>
        {label}
      </Grid.Column>
      <Grid.Column width="11" style={dataStyle}>
        {data}
      </Grid.Column>
    </Grid>
  );
}

function DisplayTravel({ data, id }) {
  return (
    <Header size="medium" key={id}>
      <Icon name="map marker alternate" />
      <Header.Content>
        {data.place}, {data.country}
      </Header.Content>
      <Header.Subheader>
        {localDateString(data.from)} - {localDateString(data.from)}
      </Header.Subheader>
    </Header>
  );
}

function DisplayData({ victimData }) {
  return (
    <Segment textAlign="center">
      <Label
        attached="top"
        style={{ color: selectColor(victimData.status), fontSize: "1.6em" }}
        size="huge"
        basic
      >
        {victimData.status.toUpperCase()}
      </Label>
      <Grid width="16" verticalAlign="middle" textAlign="center">
        <Grid.Column width="7">
          <SingleData label="Age" data={victimData.age} />
          <SingleData label="Gender" data={victimData.gender.toUpperCase()} />
          <SingleData label="Occupation" data={victimData.occupation} />
          <SingleData label="Place" data={victimData.place} />
          <SingleData label="State" data={victimData.state} />
          <SingleData label="Test Center" data={victimData.testCenter} />
          <SingleData label="Symptoms" data={victimData.symptoms.join(", ")} />
        </Grid.Column>
        <Grid.Column width="3">
          {victimData.travelHistory.length > 0 ? (
            <Header size="medium" content="Travel History" dividing />
          ) : (
            <Header size="medium" content="No recent travel history" />
          )}
          {victimData.travelHistory
            .map((data) => {
              return {
                ...data,
                from: new Date(data.from),
                to: new Date(data.to),
              };
            })
            .sort((a, b) => {
              return a.from.getTime() - b.from.getTime();
            })
            .map((data, id) => (
              <DisplayTravel data={data} id={id} />
            ))}
        </Grid.Column>
        <Grid.Column width="4">
          <Header
            size="medium"
            content="Cases within radius of 10 km"
            dividing
          />
          <Grid.Row textAlign="center">
            <span
              style={{ color: R_COLOR, fontWeight: "bolder", fontSize: "20px" }}
            >
              Recovered: {victimData.nearData.recovered}
            </span>
          </Grid.Row>
          <br />
          <Grid.Row textAlign="center">
            <span
              style={{ color: A_COLOR, fontWeight: "bolder", fontSize: "20px" }}
            >
              Active: {victimData.nearData.active}
            </span>
          </Grid.Row>
          <br />
          <Grid.Row textAlign="center">
            <span
              style={{ color: D_COLOR, fontWeight: "bolder", fontSize: "20px" }}
            >
              Died: {victimData.nearData.died}
            </span>
          </Grid.Row>
        </Grid.Column>
      </Grid>
      <Label basic attached="bottom right" size="large">
        Last updated at: {localDateTimeString(new Date(victimData.updatedAt))}
      </Label>
    </Segment>
  );
}

export default DisplayData;
