import React from "react";
import {
  Pagination,
  Header,
  Container,
  Table,
  Message,
  Icon,
} from "semantic-ui-react";
import Client from "../helpers/client";
import errorText from "../helpers/error";
import { status } from "../helpers/options";
import { stateOptions } from "../helpers/stateList";
import { SelectSimple } from "./input";
import DataTable from "./DataTable";

export default class RecentData extends React.Component {
  constructor(props) {
    super(props);
    this.count = 10;
    this.state = {
      page: 1,
      totalPages: 1,
      dataCount: 0,
      totalCount: 0,
      data: [],
      error: null,
    };
    this.data = { state: "", status: "", page: 1 };
    this.changePage = this.changePage.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  changePage(e, { activePage }) {
    this.data.page = activePage;
    this.updateData();
  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    let params = { page: this.data.page };
    if (this.data.state !== "") {
      params.state = this.data.state;
    }
    if (this.data.status !== "") {
      params.status = this.data.status;
    }
    Client.get("/victim", { params: params })
      .then((res) => {
        if (res.status < 400 && res.data.status === "OK") {
          this.setState({
            data: res.data.data,
            page: res.data.page,
            totalPages: Math.ceil(res.data.dataCount / res.data.count),
            totalCount: res.data.totalCount,
            dataCount: res.data.dataCount,
          });
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        this.setState({ error: errorText(err) });
      });
  }

  render() {
    return (
      <>
        <Header
          content="Recent Data"
          dividing
          size="huge"
          subheader={this.state.dataCount + " of " + this.state.totalCount}
        />
        <Container
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <SelectSimple
            options={stateOptions}
            label="Select State"
            name="state"
            default=""
            data={this.data}
            clearable
          />
          <SelectSimple
            options={status}
            label="Select State"
            name="state"
            default=""
            data={this.data}
            clearable
          />
          <Pagination
            boundaryRange={0}
            defaultActivePage={1}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={this.state.totalPages}
            activePage={this.state.page}
            onPageChange={this.changePage}
          />
        </Container>
        <Table>
          <Table.Header>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Last Updated</Table.HeaderCell>
            <Table.HeaderCell>Link</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {this.state.data.map((data, key) => (
              <DataTable data={data} key={key} />
            ))}
          </Table.Body>
        </Table>
        {this.state.error && (
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
        )}
      </>
    );
  }
}
