import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import ArrowKeysReact from "arrow-keys-react";
import { cloneDeep } from "lodash";

const Random = () => {
  const [grid, setGrid] = useState(
    new Array(4).fill(0).map(() => new Array(4).fill(0))
  );

  const [score, setScore] = useState(0);

  const getRandomNumber = (n) => Math.floor(Math.random() * n);

  const resetGrid = () => {
    let newGrid = new Array(4).fill(0).map(() => new Array(4).fill(0));
    let firstX = getRandomNumber(4);
    let firstY = getRandomNumber(4);

    let secondX = getRandomNumber(4);
    let secondY = getRandomNumber(4);

    // console.log('..')

    while (firstX === secondX && firstY === secondY) {
      // console.log('.....dsada')
      secondX = getRandomNumber(3);
      secondY = getRandomNumber(3);
    }

    newGrid[firstX][firstY] = 2 * (getRandomNumber(2) + 1);
    newGrid[secondX][secondY] = 2 * (getRandomNumber(2) + 1);

    setGrid(newGrid);
  };

  useEffect(() => {
    const initialize = () => {
      resetGrid();
    };
    initialize();
  }, []);

  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    while (!added) {
      // console.log(count++);
      if (gridFull) break;

      let newX = getRandomNumber(4);
      let newY = getRandomNumber(4);

      if (newGrid[newX][newY] === 0) {
        newGrid[newX][newY] = 2 * (getRandomNumber(2) + 1);
        added = true;
      }
    }
  };

  const logic = (fourArrays) => {
    let newArray = cloneDeep(fourArrays);
    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            setScore(score + b[slow] * 2);
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(fourArrays) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }

    return newArray;
  };

  ArrowKeysReact.config({
    left: () => {
      let readyGrid = cloneDeep(grid);
      let newGrid = logic(readyGrid);
      setGrid(newGrid);
    },

    right: () => {
      let readyGrid = cloneDeep(grid);
      for (let row of readyGrid) {
        row.reverse();
      }
      // console.log(readyGrid);
      let newGrid = logic(readyGrid);
      for (let row of newGrid) {
        row.reverse();
      }
      setGrid(newGrid);
    },

    up: () => {
      let readyGrid = cloneDeep(grid);
      let newGrid = readyGrid[0].map((_, colIndex) =>
        readyGrid.map((row) => row[colIndex])
      );
      newGrid = logic(newGrid);
      readyGrid = newGrid[0].map((_, colIndex) =>
        newGrid.map((row) => row[colIndex])
      );
      setGrid(readyGrid);
    },

    down: () => {
      let readyGrid = cloneDeep(grid);
      let newGrid = readyGrid[0].map((_, colIndex) =>
        readyGrid.map((row) => row[colIndex])
      );
      for (let row of newGrid) {
        row.reverse();
      }
      console.log(newGrid);
      newGrid = logic(newGrid);
      readyGrid = newGrid[0].map((_, colIndex) =>
        newGrid.map((row) => row[colIndex])
      );
      readyGrid.reverse();
      console.log(readyGrid);
      setGrid(readyGrid);
    },
  });

  return (
    <div {...ArrowKeysReact.events} tabIndex="1">
      <Grid grid={grid} />
      {/* {grid} */}
      <br />
      <button onClick={resetGrid}>Reset</button>
      <br />
      {score}
    </div>
  );
};

export default Random;
