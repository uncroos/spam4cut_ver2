import React from "react";
import html2canvas from "html2canvas";
import "./Download.css";

const Download = () => {
  const printImage = () => {
    const frame = document.querySelector(".photo-frame");

    if (frame) {
      const elementWidth = 377.95275591;
      const elementHeight = 559.37;
      html2canvas(frame, {
        scale: 4,
        useCORS: true,
        backgroundColor: null,
        windowWidth: elementWidth,
        windowHeight: elementHeight,
      }).then((canvas) => {
        const link = document.createElement("img");
        link.id = "mainImg";
        link.src = canvas.toDataURL("image/png");
        var imagObject = new Image();
        imagObject = link;
        var originalImage =
          '<img id="imageViewer" src="' +
          imagObject.src +
          '"height="' +
          100 +
          '%" width="' +
          100 +
          '%" />';

        var popup = window.open(
          "",
          "popup",
          "toolbar=no,menubar=no,width=200,height=150"
        );
        popup.document.open();
        popup.document.write("<html><head></head><body onload='print()'>");
        popup.document.write(originalImage);
        popup.document.write("</body></html>");
        popup.document.close();
      });
    } else {
      alert("사진이 준비되지 않았습니다.");
    }
  };

  const downloadImage = () => {
    const frame = document.querySelector(".photo-frame");

    if (frame) {
      const elementWidth = 377.95275591;
      const elementHeight = 559.37;
      html2canvas(frame, {
        scale: 4,
        useCORS: true,
        backgroundColor: null,
        windowWidth: elementWidth,
        windowHeight: elementHeight,
      }).then((canvas) => {
        // Create a link element
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png"); // Get the image URL
        link.download = "insaengnecut.png"; // Set the download filename
        link.click(); // Programmatically click the link to trigger download
      });
    } else {
      alert("사진이 준비되지 않았습니다.");
    }
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
