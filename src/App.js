import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./components/Start"; // StartScreen 컴포넌트 불러오기
import Choose from "./components/Choose"; // ChooseScreen 컴포넌트 불러오기
import IdolWebcam from "./components/idol/IdolCam"; // IdolWebcamScreen 컴포넌트 불러오기
import NormalWebcam from "./components/normal/NormalCam";
import Download from "./components/Download"; // Download 컴포넌트 불러오기

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} /> {/* 루트 경로 */}
        <Route path="/choose" element={<Choose />} /> {/* /choose 경로 */}
        <Route path="/download" element={<Download />} />{" "}
        <Route path="/idol-webcam" element={<IdolWebcam />} />{" "}
        <Route path="/normal-webcam" element={<NormalWebcam />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
