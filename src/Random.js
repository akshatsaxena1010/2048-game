import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Scorecard from "./Scorecard";

const WINNING_NUMBER = 128;

const getRandomNumber = (n) => Math.floor(Math.random() * n);

const Random = () => {
  const [grid, setGrid] = useState(
    new Array(4).fill(0).map(() => new Array(4).fill(0))
  );

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [highScoreFlag, setHighScoreFlag] = useState(false);
  const [highScoreName, setHighScoreName] = useState("-");

  let actualScore = 0;

  useEffect(() => {
    resetGrid();
  }, []);

  useEffect(() => {
    for (let r of grid)
      if (r.includes(WINNING_NUMBER)) {
        window.confirm("You have won the game. Congratulations!");
        resetGrid();
      }
  }, [grid]);

  const resetGrid = () => {
    if (highScoreFlag === true) {
      setHighScoreName(
        window.prompt("You have scored the highest! Please Enter Your Name")
      );
      setHighScoreFlag(false);
    }

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

  const logic = (fourArrays, checkGameFlag) => {
    let newArray = JSON.parse(JSON.stringify(fourArrays));
    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let left = 0;
      let right = 1;
      while (left < 4) {
        if (right === 4) {
          right = left + 1;
          left++;
          continue;
        }
        if (b[left] === 0 && b[right] === 0) {
          right++;
        } else if (b[left] === 0 && b[right] !== 0) {
          b[left] = b[right];
          b[right] = 0;
          right++;
        } else if (b[left] !== 0 && b[right] === 0) {
          right++;
        } else if (b[left] !== 0 && b[right] !== 0) {
          if (b[left] === b[right]) {
            b[left] = b[left] + b[right];
            b[right] = 0;
            if (checkGameFlag) {
              actualScore = score + b[left];
              setScore(actualScore);
              if (actualScore > highScore) {
                setHighScore(actualScore);
                setHighScoreFlag(true);
              }
            }
            right = left + 1;
            left++;
          } else {
            left++;
            right = left + 1;
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
    let readyGrid = JSON.parse(JSON.stringify(grid));
    let newGrid = logic(readyGrid, checkGameFlag);
    if (checkGameFlag) setGrid(newGrid);
    else
      return (
        JSON.stringify(logic(newGrid, checkGameFlag)) ===
        JSON.stringify(newGrid)
      );
  };

  const right = (checkGameFlag) => {
    let readyGrid = JSON.parse(JSON.stringify(grid));
    for (let row of readyGrid) {
      row.reverse();
    }
    let newGrid = logic(readyGrid, checkGameFlag);
    for (let row of newGrid) {
      row.reverse();
    }

    if (checkGameFlag) setGrid(newGrid);
    else
      return (
        JSON.stringify(logic(newGrid, checkGameFlag)) ===
        JSON.stringify(newGrid)
      );
  };

  const up = (checkGameFlag) => {
    let readyGrid = JSON.parse(JSON.stringify(grid));

    let newGrid = readyGrid[0].map((_, colIndex) =>
      readyGrid.map((row) => row[colIndex])
    );
    newGrid = logic(newGrid, checkGameFlag);
    readyGrid = newGrid[0].map((_, colIndex) =>
      newGrid.map((row) => row[colIndex])
    );
    if (checkGameFlag) setGrid(readyGrid);
    else
      return (
        JSON.stringify(logic(readyGrid, checkGameFlag)) ===
        JSON.stringify(readyGrid)
      );
  };

  const down = (checkGameFlag) => {
    let readyGrid = JSON.parse(JSON.stringify(grid));
    let newGrid = readyGrid[0].map((_, colIndex) =>
      readyGrid.map((row) => row[colIndex])
    );
    for (let row of newGrid) {
      row.reverse();
    }
    newGrid = logic(newGrid, checkGameFlag);
    readyGrid = newGrid[0].map((_, colIndex) =>
      newGrid.map((row) => row[colIndex])
    );
    readyGrid.reverse();
    if (checkGameFlag) {
      setGrid(readyGrid);
      return true;
    } else
      return (
        JSON.stringify(logic(readyGrid, checkGameFlag)) ===
        JSON.stringify(readyGrid)
      );
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
      window.confirm("No more moves left. Game is over. Thanks for playing");
      resetGrid();
    }
  };

  return (
    <div
      tabIndex="1"
      onKeyDown={(e) => handleKeyDown(e)}
      style={style.appStyle}
    >
      <h1 style={style.h1Style}>2048</h1>
      <Scorecard score={score} highScore={highScore} name={highScoreName} />
      <Grid grid={grid} />
      <br />
      <button onClick={resetGrid} style={style.buttonStyle}>
        New Game
      </button>
    </div>
  );
};

export default Random;

const style = {
  appStyle: {
    outline: "none",
    display: "inline",
    width: "50%",
    margin: "auto",
    marginTop: 30,
    marginBottom: 30,
    paddingLeft: 20,
  },
  buttonStyle: {
    margin: "auto",
    fontWeight: "bold",
    fontSize: 30,
    background: "#8f7a66",
    borderRadius: 100,
    color: "#f9f6f2",
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "none",
  },
  h1Style: {
    float: "left",
    fontSize: 64,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 15,
    margin: 0,
    color: "#776e65",
  },
};
