import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./components/Start"; // Start 컴포넌트
import Choose from "./components/Choose"; // Choose 컴포넌트
import IdolWebcam from "./components/idol/IdolCam"; // IdolWebcam 컴포넌트
import NormalWebcam from "./components/normal/NormalCam"; // NormalWebcam 컴포넌트
import Download from "./components/Download"; // Download 컴포넌트 (기본)
import NormalPhotoFrame from "./components/normal/NormalPhotoFrame"; // NormalPhotoFrame 컴포넌트
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [showStartScreen, setShowStartScreen] = useState(true);

  // 사진 추가 함수
  const addPhoto = (photo) => {
    if (photos.length < 4) {
      setPhotos((prevPhotos) => [...prevPhotos, photo]);
    }
    if (photos.length === 3) {
      setIsCapturing(false);
    }
  };

  // 시작 화면에서의 시작 버튼 핸들러
  const handleStart = () => {
    setShowStartScreen(false);
  };

  // 프레임 선택 핸들러
  const handleFrameSelect = (frame) => {
    setSelectedFrame(frame);
    setIsCapturing(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            showStartScreen ? (
              <Start onStart={handleStart} /> // Start 컴포넌트에서 onStart 이벤트 핸들러 연결
            ) : !selectedFrame ? (
              <Choose selectFrame={handleFrameSelect} /> // Choose 컴포넌트에서 프레임 선택 이벤트 핸들러 연결
            ) : isCapturing ? (
              <NormalWebcam addPhoto={addPhoto} photoCount={photos.length} /> // 사진 촬영 화면
            ) : (
              <div>
                <NormalPhotoFrame photos={photos} frameType={selectedFrame} />{" "}
                {/* NormalPhotoFrame으로 사진 표시 */}
                <Download photos={photos} />{" "}
                {/* Download 컴포넌트에 photos 전달 */}
              </div>
            )
          }
        />
        <Route
          path="/choose"
          element={<Choose selectFrame={handleFrameSelect} />}
        />{" "}
        {/* /choose 경로 */}
        <Route path="/download" element={<Download photos={photos} />} />{" "}
        {/* Download 경로 */}
        <Route
          path="/idol-webcam"
          element={
            <IdolWebcam addPhoto={addPhoto} photoCount={photos.length} />
          }
        />
        <Route
          path="/normal-webcam"
          element={
            <NormalWebcam addPhoto={addPhoto} photoCount={photos.length} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
