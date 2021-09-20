import React from "react";

const divStyle = {
  padding: 5,
};

const Tile = (props) => {
  return <span style={divStyle}>{props.num}</span>;
};

export default Tile;
