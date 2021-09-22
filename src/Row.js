import React from "react";
import Tile from "./Tile";

export default function Row(props) {
  return (
    <div style={divStyle}>
      {props.row.map((e, i) => (
        <Tile num={e} key={i} />
      ))}
    </div>
  );
}

const divStyle = {
  display: "flex",
  width: "100%",
  margin: "auto",
};
