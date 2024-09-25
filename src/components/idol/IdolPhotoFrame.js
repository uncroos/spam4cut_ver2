import React from "react";
import "./IdolPhotoFrame.css";

const frameLayouts = {
  // 각 프레임에 맞는 레이아웃 정보 정의
  park_frame: [
    { width: 500, height: 700, top: 125, left: 88 },
    { width: 500, height: 700, top: 125, left: 612 },
    { width: 500, height: 700, top: 849, left: 88 },
    { width: 500, height: 700, top: 849, left: 612 },
  ],
};

const IdolPhotoFrame = ({ photos, frameType }) => {
  const layouts = frameLayouts[frameType] || [];

  return (
    <div
      className="photo-frame"
      style={{ backgroundImage: `url(/${frameType}.png)` }} // 배경 이미지 설정
    >
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`사진 ${index + 1}`}
          className={`photo${index + 1}`}
          style={{
            width: layouts[index]?.width,
            height: layouts[index]?.height,
            top: layouts[index]?.top,
            left: layouts[index]?.left,
            position: "absolute",
          }}
        />
      ))}
    </div>
  );
};

export default IdolPhotoFrame;
