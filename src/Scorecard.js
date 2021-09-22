import React from "react";

const Scorecard = (props) => {
  return (
    <div style={style.divStyle}>
      <div style={style.scoreStyle}>
        Score
        <br />
        {props.score}
      </div>
      <div style={style.highScoreStyle}>
        High Score
        <br />
        {props.highScore}
        <br />
        {props.name}
      </div>
    </div>
  );
};

const style = {
  divStyle: {
    float: "right",
  },
  scoreStyle: {
    float: "left",
    position: "relative",
    display: "block",
    width: "relative",
    background: "#bbada0",
    fontSize: "25px",
    fontWeight: "bold",
    borderRadius: "6px",
    padding: "15px 25px",
    color: "white",
    textAlign: "center",
    marginRight: "10px",
  },
  highScoreStyle: {
    float: "right",
    position: "relative",
    display: "block",
    background: "#bbada0",
    fontSize: "25px",
    fontWeight: "bold",
    borderRadius: "6px",
    padding: "15px 25px",
    color: "white",
    textAlign: "center",
    marginBottom: "10px",
    marginRight: "10px",
  },
};
export default Scorecard;
