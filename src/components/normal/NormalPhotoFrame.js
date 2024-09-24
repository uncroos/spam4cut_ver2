import React from "react";
import "./NormalPhotoFrame.css";

const frameLayouts = {
  spam_frame: [
    { width: 500, height: 700, top: 125, left: 88 },
    { width: 500, height: 700, top: 125, left: 612 },
    { width: 500, height: 700, top: 849, left: 88 },
    { width: 500, height: 700, top: 849, left: 612 },
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
};

const PhotoFrame = ({ photos, frameType }) => {
  const layouts = frameLayouts[frameType] || [];

  return (
    <div className="photo-frame">
      {displayedPhotos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`사진 ${index + 1}`}
          style={{
            width: `${layouts[index]?.width}px`,
            height: `${layouts[index]?.height}px`,
            top: `${layouts[index]?.top}px`,
            left: `${layouts[index]?.left}px`,
            position: "absolute",
            zIndex: 1,
            objectFit: "cover",
          }}
        />
      ))}
      <div
        className="frame-overlay"
        style={{
          backgroundImage: `url(/${frameType}.png)`,
        }}
      />
    </div>
  );
};

export default PhotoFrame;
