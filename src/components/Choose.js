import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Choose.css";

const Choose = ({ selectFrame }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0); // 현재 프레임 인덱스 관리
  const navigate = useNavigate();

  // 사용할 프레임 목록 (이미지 경로와 설명)
  const frames = [
    {
      id: "frame1",
      imageClass: "spam-frame", // 프레임 이미지 클래스
      description:
        "이 프레임은 스팸네컷의 대표 프레임입니다. \b 이 프레임에는 SPAM 사진이 35개 사용되었습니다. ",
    },
    {
      id: "frame2",
      imageClass: "mabear-frame",
      description: "이 프레임은 ~~~~~~~~~~~~~",
    },
    {
      id: "frame3",
      imageClass: "cheese-frame",
      description: "이 프레임은 ~~~~~~~~~~~~~",
    },
    {
      id: "frame4",
      imageClass: "yohan-frame",
      description: `
프레임은 교내 유일 소프트웨어이자 0티어 동아리 SPAM의
3기 부장 안요한 프레임입니다.
'⭐은 이루어지는 거야' 라는 문구가 적혀 있어, 
희망과 목표 달성에 대한 메시지를 전달하는 느낌을 줍니다. 
배경은 무지갯빛 그라데이션으로 처리되어 있습니다. 
전체적으로 이 프레임은 활기차고 재미있는 분위기를 가지고 있습니다.
`,
    },
    {
      id: "frame5",
      imageClass: "park-frame",
      description: "이 프레임은 ~~~~~~~~~~~~~",
    },
  ];

  const currentFrame = frames[currentFrameIndex]; // 현재 프레임 객체 가져오기

  const handleNextFrame = () => {
    // 다음 프레임으로 이동
    setCurrentFrameIndex((prevIndex) =>
      prevIndex === frames.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevFrame = () => {
    // 이전 프레임으로 이동
    setCurrentFrameIndex((prevIndex) =>
      prevIndex === 0 ? frames.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (currentFrame) {
      selectFrame(currentFrame.id); // 선택된 프레임을 부모 컴포넌트에 전달
      navigate("/normal-webcam"); // 다음 단계로 이동
    } else {
      alert("프레임을 선택해주세요.");
    }
  };

  return (
    <div className="choose-screen">
      <h1>사진을 찍을 프레임을 선택하세요</h1>
      <div className="frame-selection">
        <div className="frame-image" id={currentFrame.id}>
          <div className={`frame-image ${currentFrame.imageClass}`}></div>
        </div>
        <div className="frame-description">
          <h2>프레임 설명</h2>
          <p>{currentFrame.description}</p>
        </div>
      </div>
      <div className="navigation-buttons">
        <button className="nav-button" onClick={handlePrevFrame}>
          ◀
        </button>
        <button className="next-button" onClick={handleNext}>
          다음 단계
        </button>
        <button className="nav-button" onClick={handleNextFrame}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default Choose;
