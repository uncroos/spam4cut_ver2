import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./NormalCam.css"; // 필요한 스타일을 추가하세요

const NormalCam = () => {
  const [photos, setPhotos] = useState([]);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
  };

  const handleFinish = () => {
    if (photos.length < 4) {
      alert("4장의 사진을 모두 촬영해주세요.");
    } else {
      navigate("/download", { state: { photos } });
    }
  };

  return (
    <div className="normal-cam">
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" />
      <div className="controls">
        <button onClick={capture}>촬영</button>
        <button onClick={handleFinish}>완료</button>
      </div>
      <div className="photo-preview">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`photo-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default NormalCam;
