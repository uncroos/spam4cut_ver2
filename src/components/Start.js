import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 사용
import "./Start.css"; // 스타일 시트 파일 불러오기
import spamLogo from "../images/spamlogo.png"; // 로고 이미지 경로

const Start = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleStartClick = () => {
    navigate("/choose"); // /choose 경로로 이동
  };

  return (
    <div className="start-screen">
      <img src={spamLogo} alt="Spam Logo" className="logo" />
      <h1>스팸네컷</h1>
      <p>-</p>
      <button onClick={handleStartClick}>시작하기</button>
    </div>
  );
};

export default Start;
