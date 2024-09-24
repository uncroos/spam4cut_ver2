import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./components/Start"; // StartScreen 컴포넌트 불러오기
import Choose from "./components/Choose"; // ChooseScreen 컴포넌트 불러오기
import Download from "./components/Download"; // Download 컴포넌트 불러오기

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} /> {/* 루트 경로 */}
        <Route path="/choose" element={<Choose />} /> {/* /choose 경로 */}
        <Route path="/idol-webcam" element={<Download />} />{" "}
        {/* /idol-webcam 경로 */}
      </Routes>
    </Router>
  );
}

export default App;
