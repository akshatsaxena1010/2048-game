import React from "react";
import Row from "./Row";

const Grid = (props) => {
  let grid = props.grid;
  return (
    <div style={style.gridStyle}>
      {grid.map((row, i) => {
        return <Row row={row} key={i} />;
      })}
    </div>
  );
};

const style = {
  gridStyle: {
    align: "center",
  },
};

export default Grid;
