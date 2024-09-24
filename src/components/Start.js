import React from "react";
import "./Start.css"; // css 참조
import spamLogo from "../images/spamlogo.png"; // Adjust the path as needed

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <img src={spamLogo} alt="Spam Logo" className="logo" />
      <h1>스팸네컷</h1>
      <button onClick={onStart}>시작하기</button>
    </div>
  );
};

export default StartScreen;
