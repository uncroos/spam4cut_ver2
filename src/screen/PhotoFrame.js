import React from "react";
import "./PhotoFrame.css";

const frameLayouts = {
  spam_frame: [
    { width: 512, height: 612, top: 406, left: 63 },
    { width: 512, height: 612, top: 137, left: 626 },
    { width: 512, height: 612, top: 1050, left: 63 },
    { width: 512, height: 612, top: 781, left: 626 },
  ],
  mabear_frame: [
    { width: 512, height: 612, top: 406, left: 63 },
    { width: 512, height: 612, top: 137, left: 626 },
    { width: 512, height: 612, top: 1050, left: 63 },
    { width: 512, height: 612, top: 781, left: 626 },
  ],
  cheese_frame: [
    { width: 512, height: 612, top: 406, left: 63 },
    { width: 512, height: 612, top: 137, left: 626 },
    { width: 512, height: 612, top: 1050, left: 63 },
    { width: 512, height: 612, top: 781, left: 626 },
  ],
  yohan_frame: [
    { width: 512, height: 612, top: 406, left: 63 },
    { width: 512, height: 612, top: 137, left: 626 },
    { width: 512, height: 612, top: 1050, left: 63 },
    { width: 512, height: 612, top: 781, left: 626 },
  ],
  merun_frame: [
    { width: 513, height: 612, top: 406, left: 63 },
    { width: 513, height: 612, top: 137, left: 626 },
    { width: 513, height: 612, top: 1050, left: 63 },
    { width: 513, height: 612, top: 781, left: 625 },
  ],
  newjens_frame: [
    { width: 512, height: 612, top: 406, left: 63 },
    { width: 512, height: 612, top: 137, left: 625 },
    { width: 512, height: 612, top: 1050, left: 63 },
    { width: 512, height: 612, top: 781, left: 626 },
  ],
};
const PhotoFrame = ({ photos, frameType }) => {
  const layouts = frameLayouts[frameType] || [];

  return (
    <div className="photo-frame-container">
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
          }}
          crossOrigin="anonymous"
        />
      ))}
      <div
        className="frame-overlay"
        style={{ backgroundImage: `url(/${frameType}.png)` }}
      />
    </div>
  );
};

export default PhotoFrame;
