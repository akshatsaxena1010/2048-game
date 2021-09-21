import React, { useState, useEffect, useEvent } from "react";
import Grid from "./Grid";
import ArrowKeysReact from "arrow-keys-react";
import { cloneDeep } from "lodash";

const Random = () => {
  const [grid, setGrid] = useState(
    new Array(4).fill(0).map(() => new Array(4).fill(0))
  );

  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useState(0);

  const getRandomNumber = (n) => Math.floor(Math.random() * n);

  let actualScore = 0;

  const resetGrid = () => {
    let newGrid = new Array(4).fill(0).map(() => new Array(4).fill(0));
    let firstX = getRandomNumber(4);
    let firstY = getRandomNumber(4);

    let secondX = getRandomNumber(4);
    let secondY = getRandomNumber(4);

    while (firstX === secondX && firstY === secondY) {
      secondX = getRandomNumber(3);
      secondY = getRandomNumber(3);
    }

    newGrid[firstX][firstY] = 2 * (getRandomNumber(2) + 1);
    newGrid[secondX][secondY] = 2 * (getRandomNumber(2) + 1);
    actualScore = 0;

    setScore(0);
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
            actualScore = score + b[slow];
            setScore(actualScore);
            if (actualScore > highScore) setHighScore(actualScore);
            // console.log(actualScore, highScore);
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

  const left = (checkGameFlag) => {
    let readyGrid = cloneDeep(grid);
    let newGrid = logic(readyGrid);
    if (checkGameFlag) setGrid(newGrid);
    else return JSON.stringify(logic(newGrid)) === JSON.stringify(newGrid);
  };

  const right = (checkGameFlag) => {
    let readyGrid = cloneDeep(grid);
    for (let row of readyGrid) {
      row.reverse();
    }
    // console.log(readyGrid);
    let newGrid = logic(readyGrid);
    for (let row of newGrid) {
      row.reverse();
    }

    if (checkGameFlag) setGrid(newGrid);
    else return JSON.stringify(logic(newGrid)) === JSON.stringify(newGrid);
  };

  const up = (checkGameFlag) => {
    let readyGrid = cloneDeep(grid);
    let newGrid = readyGrid[0].map((_, colIndex) =>
      readyGrid.map((row) => row[colIndex])
    );
    newGrid = logic(newGrid);
    readyGrid = newGrid[0].map((_, colIndex) =>
      newGrid.map((row) => row[colIndex])
    );
    if (checkGameFlag) setGrid(readyGrid);
    else return JSON.stringify(logic(readyGrid)) === JSON.stringify(readyGrid);
  };

  const down = (checkGameFlag) => {
    let readyGrid = cloneDeep(grid);
    let newGrid = readyGrid[0].map((_, colIndex) =>
      readyGrid.map((row) => row[colIndex])
    );
    for (let row of newGrid) {
      row.reverse();
    }
    // console.log(newGrid);
    newGrid = logic(newGrid);
    readyGrid = newGrid[0].map((_, colIndex) =>
      newGrid.map((row) => row[colIndex])
    );
    readyGrid.reverse();
    // console.log(readyGrid);
    if (checkGameFlag) setGrid(readyGrid);
    else return JSON.stringify(logic(readyGrid)) === JSON.stringify(readyGrid);
  };

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 38:
        // console.log("Upkey");
        up(true);
        break;
      case 40:
        // console.log("Down");
        down(true);
        break;
      case 37:
        // console.log("Left");
        left(true);
        break;
      case 39:
        // console.log("right");
        right(true);
        break;
      default:
        break;
    }

    if (up(false) && down(false) && left(false) && right(false)) {
      console.log("Game Over");
    }
  };

  return (
    <div
      {...ArrowKeysReact.events}
      tabIndex="1"
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <Grid grid={grid} />
      <br />
      <button onClick={resetGrid}>Reset</button>
      <br />
      {score}
      <br />
      {highScore}
    </div>
  );
};

export default Random;
