import React from "react";
import Tile from "./Tile";

const Grid = (props) => {
  // const showGrid = () => {

  //     let count = 0
  //     props.grid.map((row) => {
  //         console.log(row)
  //         return (
  //             <div>
  //                 {row.map((num) => {
  //                     return <Tile num={num} key={count++}/>
  //                 })}
  //             </div>
  //         )
  //     })
  // }
  return (
    <div>
      {/* {showGrid()} */}
      <Tile num={props.grid[0][0]} />
      <Tile num={props.grid[0][1]} />
      <Tile num={props.grid[0][2]} />
      <Tile num={props.grid[0][3]} />
      <br />
      <Tile num={props.grid[1][0]} />
      <Tile num={props.grid[1][1]} />
      <Tile num={props.grid[1][2]} />
      <Tile num={props.grid[1][3]} />
      <br />
      <Tile num={props.grid[2][0]} />
      <Tile num={props.grid[2][1]} />
      <Tile num={props.grid[2][2]} />
      <Tile num={props.grid[2][3]} />
      <br />
      <Tile num={props.grid[3][0]} />
      <Tile num={props.grid[3][1]} />
      <Tile num={props.grid[3][2]} />
      <Tile num={props.grid[3][3]} />
    </div>
  );
};

export default Grid;
