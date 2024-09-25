import React, { useState } from "react";
import html2canvas from "html2canvas";
import "./DownloadButton.css";

const DownloadButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const captureImage = (action) => {
    setIsLoading(true);
    const frame = document.querySelector(".photo-frame-container");

    if (!frame) {
      alert("프레임을 찾을 수 없습니다.");
      setIsLoading(false);
      return;
    }

    const images = frame.querySelectorAll("img");
    const imagePromises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      html2canvas(frame, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        width: frame.offsetWidth,
        height: frame.offsetHeight,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
      })
        .then((canvas) => {
          if (action === "print") {
            const imgData = canvas.toDataURL("image/png");
            const printContent = `
            <html>
              <head>
                <title>Print</title>
                <style>
                  @page {
                    size: 100mm 148mm; /* Hagaki size */
                    margin: 0;
                  }
                  body {
                    margin: 0;
                    padding: 0;
                  }
                  img {
                    width: 100mm;
                    height: 148mm;
                    object-fit: contain;
                  }
                </style>
              </head>
              <body>
                <img src="${imgData}" alt="Print Image">
                <script>
                  window.onload = function() {
                    setTimeout(function() {
                      window.print();
                      window.close();
                    }, 500);
                  };
                </script>
              </body>
            </html>
          `;
            const printWindow = window.open("", "_blank");
            if (printWindow) {
              printWindow.document.write(printContent);
              printWindow.document.close();
            } else {
              alert(
                "팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요."
              );
            }
          } else if (action === "download") {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "insaengnecut.png";
            link.click();
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("캡처 중 오류 발생:", err);
          alert("이미지 캡처 중 오류가 발생했습니다.");
          setIsLoading(false);
        });
    });
  };

  return (
    <div className="download-box">
      <button
        className="print-button"
        onClick={() => captureImage("print")}
        disabled={isLoading}
      >
        {isLoading ? "처리 중..." : "출력"}
      </button>
      <button
        className="download-button"
        onClick={() => captureImage("download")}
        disabled={isLoading}
      >
        {isLoading ? "처리 중..." : "다운로드"}
      </button>
    </div>
  );
};

export default DownloadButton;
