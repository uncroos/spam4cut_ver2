import React from "react";
import html2canvas from "html2canvas";
import "./Download.css";

const Download = ({ photos }) => {
  const elementWidth = 377.95275591;
  const elementHeight = 559.37;

  const createCanvas = () => {
    const frame = document.querySelector(".photo-frame");

    if (frame) {
      return html2canvas(frame, {
        scale: 4,
        useCORS: true,
        backgroundColor: null,
        windowWidth: elementWidth,
        windowHeight: elementHeight,
      });
    } else {
      alert("사진이 준비되지 않았습니다.");
      return null;
    }
  };

  const printImage = () => {
    if (photos.length === 0) {
      alert("사진이 준비되지 않았습니다.");
      return;
    }

    createCanvas()?.then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const popup = window.open(
        "",
        "popup",
        "toolbar=no,menubar=no,width=600,height=600"
      );
      if (popup) {
        popup.document.open();
        popup.document.write(`
          <html>
            <head>
              <style>
                body { margin: 0; display: flex; justify-content: center; align-items: center; }
                img { width: 100%; height: 100%; object-fit: contain; }
              </style>
            </head>
            <body onload='window.print(); window.close();'>
              <img src="${img}" alt="사진"/>
            </body>
          </html>
        `);
        popup.document.close();
      }
    });
  };

  const downloadImage = () => {
    if (photos.length === 0) {
      alert("사진이 준비되지 않았습니다.");
      return;
    }

    createCanvas()?.then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "insaengnecut.png";
      link.click();
    });
  };

  return (
    <div className="download-box">
      <button className="print-button" onClick={printImage}>
        출력
      </button>
      <button className="download-button" onClick={downloadImage}>
        다운로드
      </button>
    </div>
  );
};

export default Download;
