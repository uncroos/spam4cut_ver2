import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./components/Start"; // 확인: 올바른 경로 및 export 방식 확인
import Choose from "./components/Choose";
import IdolWebcam from "./components/idol/IdolCam";
import NormalWebcam from "./components/normal/NormalCam";
import Download from "./components/Download"; // export default 확인
import NormalPhotoFrame from "./components/normal/NormalPhotoFrame"; // export default 확인
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [showStartScreen, setShowStartScreen] = useState(true);

  const addPhoto = (photo) => {
    if (photos.length < 4) {
      setPhotos((prevPhotos) => [...prevPhotos, photo]);
    }
    if (photos.length === 3) {
      setIsCapturing(false);
    }
  };

  const handleStart = () => {
    setShowStartScreen(false);
  };

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
              <NormalWebcam addPhoto={addPhoto} photoCount={photos.length} />
            ) : (
              <div>
                <NormalPhotoFrame photos={photos} frameType={selectedFrame} />
                <Download photos={photos} /> {/* photos 전달 확인 */}
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
