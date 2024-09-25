import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Choose.css";

const Choose = ({ selectFrame }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isFrameSelected, setIsFrameSelected] = useState(false); // 선택 상태 관리
  const navigate = useNavigate();

  const frames = [
    { id: "frame1", imageClass: "spam-frame", description: "스팸 프레임 설명" },
    {
      id: "frame2",
      imageClass: "mabear-frame",
      description: "마베어 프레임 설명",
    },
    {
      id: "frame3",
      imageClass: "cheese-frame",
      description: "치즈 프레임 설명",
    },
    {
      id: "frame4",
      imageClass: "yohan-frame",
      description: "요한 프레임 설명",
    },
    { id: "frame5", imageClass: "park-frame", description: "박 프레임 설명" },
  ];

  const currentFrame = frames[currentFrameIndex];

  const handleNextFrame = () => {
    setCurrentFrameIndex((prevIndex) =>
      prevIndex === frames.length - 1 ? 0 : prevIndex + 1
    );
    setIsFrameSelected(false); // 프레임 이동 시 선택 해제
  };

  const handlePrevFrame = () => {
    setCurrentFrameIndex((prevIndex) =>
      prevIndex === 0 ? frames.length - 1 : prevIndex - 1
    );
    setIsFrameSelected(false); // 프레임 이동 시 선택 해제
  };

  const handleSelectFrame = () => {
    console.log("현재 선택된 프레임:", currentFrame.id); // 현재 선택된 프레임 ID를 콘솔에 출력
    setIsFrameSelected(true);
    selectFrame(currentFrame.id); // 선택된 프레임을 부모 컴포넌트에 전달
  };

  const handleNext = () => {
    if (isFrameSelected) {
      if (currentFrame.id === "frame5") {
        navigate("/idol-webcam");
      } else {
        navigate("/normal-webcam");
      }
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
        <button className="select-button" onClick={handleSelectFrame}>
          선택
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={!isFrameSelected} // 선택되지 않았으면 버튼 비활성화
          style={{
            cursor: isFrameSelected ? "pointer" : "not-allowed",
            opacity: isFrameSelected ? 1 : 0.5,
          }}
        >
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
