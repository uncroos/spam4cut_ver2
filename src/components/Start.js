import React from "react";
import "./Start.css"; // css 파일 참조
import spamLogo from "../images/spamlogo.png"; // 로고 이미지 경로 설정

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
