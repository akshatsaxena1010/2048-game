import React from "react";

const getColors = (num) => {
  switch (num) {
    case 2:
      return "#EBDCD0";
    case 4:
      return "#E9DBBA";
    case 8:
      return "#E9A067";
    case 16:
      return "#F08151";
    case 32:
      return "#F2654F";
    case 64:
      return "#F1462C";
    case 128:
      return "#E7C65E";
    case 256:
      return "#E8C350";
    case 512:
      return "#E8BE40";
    case 1024:
      return "#E8BB31";
    case 2048:
      return "#E7B723";
    default:
      return "#C2B3A3";
  }
};

const getFontColor = (num) => {
  if (num === 2 || num === 4) return "black";
  return "white";
};

const Tile = (props) => {
  return (
    <span style={divStyle(props.num)}>
      <span style={numStyle}>{props.num !== 0 ? props.num : ""}</span>
    </span>
  );
};

export default Tile;

const numStyle = {};

const divStyle = (num) => {
  return {
    padding: 5,
    minWidth: 120,
    height: 120,
    background: getColors(num),
    color: getFontColor(num),
    marginLeft: 10,
    marginTop: 10,
    fontSize: "45px",
    position: "relative",
    borderRadius: "6%",
    fontWeight: "bold",
  };
};
