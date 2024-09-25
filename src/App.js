import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import Choose from "./components/Choose";
import IdolCam from "./components/idol/IdolCam";
import NormalCam from "./components/normal/NormalCam";
import Download from "./components/Download";
import IdolPhotoFrame from "./components/idol/IdolPhotoFrame";
import NormalPhotoFrame from "./components/normal/NormalPhotoFrame";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [showStartScreen, setShowStartScreen] = useState(true);

  // 사진 추가 함수
  const addPhoto = (photo) => {
    setPhotos((prevPhotos) => [...prevPhotos, photo]);
    if (photos.length === 3) {
      // 4번째 사진 추가 시 촬영 종료
      setIsCapturing(false);
    }
  };

  // 시작 화면에서 시작 버튼을 눌렀을 때 호출
  const handleStart = () => {
    setShowStartScreen(false);
  };

  // 프레임 선택 시 호출
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
              <Start onStart={handleStart} />
            ) : !selectedFrame ? (
              <Choose selectFrame={handleFrameSelect} />
            ) : isCapturing ? (
              selectedFrame === "park_frame" ? (
                <IdolCam addPhoto={addPhoto} photoCount={photos.length} />
              ) : (
                <NormalCam addPhoto={addPhoto} photoCount={photos.length} />
              )
            ) : selectedFrame === "park_frame" ? (
              <div>
                <IdolPhotoFrame photos={photos} frameType={selectedFrame} />
                <Download photos={photos} />
              </div>
            ) : (
              <div>
                <NormalPhotoFrame photos={photos} frameType={selectedFrame} />
                <Download photos={photos} />
              </div>
            )
          }
        />
        <Route
          path="/choose"
          element={<Choose selectFrame={handleFrameSelect} />}
        />
        <Route path="/download" element={<Download photos={photos} />} />
        <Route
          path="/idol-webcam"
          element={<IdolCam addPhoto={addPhoto} photoCount={photos.length} />}
        />
        <Route
          path="/normal-webcam"
          element={<NormalCam addPhoto={addPhoto} photoCount={photos.length} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
