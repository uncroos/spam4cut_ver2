import React, { useState } from "react";
import "./ChooseScreen.css";

const ChooseScreen = ({ selectFrame }) => {
  const [selectedFrame, setSelectedFrame] = useState(null);

  const handleFrameSelect = (frame) => {
    setSelectedFrame(frame);
  };

  const handleNext = () => {
    if (selectedFrame) {
      selectFrame(selectedFrame); // 선택된 프레임을 부모 컴포넌트에 전달
    } else {
      alert("프레임을 선택해주세요.");
    }
  };

  return (
    <div className="choose-screen">
      <h1>사진을 찍을 프레임을 선택하세요</h1>
      <div className="frame-container">
        <div
          className={`frame-option ${
            selectedFrame === "spam_frame" ? "selected" : ""
          }`}
          onClick={() => handleFrameSelect("spam_frame")}
        >
          <div className="frame-image spam-frame"></div>
        </div>
        <div
          className={`frame-option ${
            selectedFrame === "mabear_frame" ? "selected" : ""
          }`}
          onClick={() => handleFrameSelect("mabear_frame")}
        >
          <div className="frame-image mabear-frame"></div>
        </div>
        <div
          className={`frame-option ${
            selectedFrame === "cheese_frame" ? "selected" : ""
          }`}
          onClick={() => handleFrameSelect("cheese_frame")}
        >
          <div className="frame-image cheese-frame"></div>
        </div>
        <div
          className={`frame-option ${
            selectedFrame === "yohan_frame" ? "selected" : ""
          }`}
          onClick={() => handleFrameSelect("yohan_frame")}
        >
          <div className="frame-image yaohan-frame"></div>
        </div>
        <div
          className={`frame-option ${
            selectedFrame === "merun_frame" ? "selected" : ""
          }`}
          onClick={() => handleFrameSelect("merun_frame")}
        >
          <div className="frame-image merun-frame"></div>
        </div>
        <div
          className={`frame-option ${
            selectedFrame === "newjens_frame" ? "selected" : ""
          }`}
          onClick={() => handleFrameSelect("newjens_frame")}
        >
          <div className="frame-image newjens-frame"></div>
        </div>
      </div>
      <button className="next-button" onClick={handleNext}>
        다음 단계
      </button>
    </div>
  );
};

export default ChooseScreen;
