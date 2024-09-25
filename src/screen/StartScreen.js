import React from "react";
import "./StartScreen.css"; // Importing CSS for styles

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <img src="./spamlogo.png" alt="Spam Logo" className="logo" />
      <h1>스팸네컷</h1>
      <button onClick={onStart}>시작하기</button>
    </div>
  );
};

export default StartScreen;
