import React from "react";

const CounterItem = (props) => {
  return (
    <div className="counterItem">
      <h2>{props.number}</h2>
      <h3>{props.unit}</h3>
    </div>
  );
};

export default CounterItem;
