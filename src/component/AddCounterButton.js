import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

const AddCounterButton = ({ handleClick }) => (
  <Button type="primary" onClick={handleClick}>
    Help me out
  </Button>
);
AddCounterButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
export default AddCounterButton;
