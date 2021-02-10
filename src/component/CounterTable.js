import React from "react";
import { Table, Button } from "antd";
import PropTypes from "prop-types";

const { Summary } = Table;
const { Row, Cell } = Summary;
const columns = [
  {
    title: "Counter",
    dataIndex: "key",
  },
  {
    title: "Processing",
    dataIndex: "processingNumber",
    render: (num) => num ?? "idle",
  },
  {
    title: "Processed",
    dataIndex: "processed",
    render: (list) => list.join(","),
    width: "30%",
    ellipsis: true,
  },
];
const CounterTable = ({
  counterInfo,
  handleDrawNumber,
  waitingList,
  nextNumber,
}) => (
  <Table
    columns={columns}
    dataSource={Object.keys(counterInfo).map((key) => ({
      ...counterInfo[key],
      key,
    }))}
    pagination={false}
    bordered
    summary={() => (
      <Row>
        <Cell colSpan={3}>
          <div className="summary">
            <div>
              Waitings:
              {waitingList.length}
            </div>
            <Button type="primary" onClick={handleDrawNumber}>
              Next
              {nextNumber}
            </Button>
          </div>
        </Cell>
      </Row>
    )}
  />
);

CounterTable.propTypes = {
  counterInfo: PropTypes.shape({
    processingNumber: PropTypes.number,
    processed: PropTypes.shape(PropTypes.number),
  }).isRequired,
  handleDrawNumber: PropTypes.func.isRequired,
  waitingList: PropTypes.shape(PropTypes.number).isRequired,
  nextNumber: PropTypes.number.isRequired,
};

export default CounterTable;
