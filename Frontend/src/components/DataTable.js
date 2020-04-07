import React from "react";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { selectColor } from "../helpers/constant";
import { localDateTimeString } from "../helpers/date";

export default function DataTable({ data }) {
  return (
    <Table.Row>
      <Table.Cell>
        <span style={{ color: selectColor(data.status) }}>
          {data.status.toUpperCase()}
        </span>
      </Table.Cell>
      <Table.Cell>{data.state}</Table.Cell>
      <Table.Cell>{localDateTimeString(new Date(data.updatedAt))}</Table.Cell>
      <Table.Cell>
        <Link to={"/data" + data._id} title="View">
          View
        </Link>
        /
        <Link to={"/update" + data._id} title="Update">
          Update
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}
