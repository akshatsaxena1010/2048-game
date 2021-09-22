import React from "react";

const Scorecard = (props) => {
  return (
    <div style={style.divStyle}>
      <div style={style.scoreStyle}>
        <span style={style.textStyle}>SCORE</span>
        <br />
        {props.score}
      </div>
      <div style={style.scoreStyle}>
        <span style={style.textStyle}>HIGHEST</span>
        <br />
        {props.highScore}
      </div>
      <div style={style.scoreStyle}>
        <span style={style.textStyle}>BEST SCORE BY</span>
        <br />
        {props.name}
      </div>
    </div>
  );
};

const style = {
  divStyle: {
    float: "left",
  },
  scoreStyle: {
    float: "left",
    position: "relative",
    display: "block",
    width: "relative",
    background: "#bbada0",
    fontSize: "30px",
    fontWeight: "bold",
    borderRadius: "6px",
    padding: "0px 20px",
    color: "white",
    textAlign: "center",
    marginRight: 10,
    marginTop: 10,
  },
  textStyle: {
    fontSize: "17px",
  },
};
export default Scorecard;
