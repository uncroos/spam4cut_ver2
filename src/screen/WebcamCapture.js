import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import "./WebcamCapture.css";

const WebcamCapture = ({ addPhoto, photoCount }) => {
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0); // 사진 인덱스 상태 추가
  const [isProcessing, setIsProcessing] = useState(false); // 현재 처리 중인지 여부를 나타내는 상태 추가

  const deviceId =
    "7782baa2ef9fe736b816e8ecfcec158bd9057841d9a2f433e4006ed03f3570e8";

  const playSound = () => {
    const audio = new Audio("./mp3.mp3");
    audio.play();
  };

  const capture = () => {
    if (photoCount >= 4 || capturing) return; // 4장 이상이거나 촬영 중일 때는 시작하지 않음
    setCapturing(true);
    setCountdown(5); // 5초 카운트다운 시작
    setPhotoIndex(0); // 촬영 인덱스 초기화
  };

  const handleAddPhoto = useCallback(
    (imageSrc) => {
      addPhoto(imageSrc);
    },
    [addPhoto]
  );

  const cropImage = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 960;
        canvas.height = 1280;
        const ctx = canvas.getContext("2d");

        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        const croppedImageSrc = canvas.toDataURL("image/jpeg", 1.0);
        resolve(croppedImageSrc);
      };
    });
  };

  useEffect(() => {
    let timer;
    if (capturing && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (
      countdown === 0 &&
      capturing &&
      photoIndex < 4 &&
      !isProcessing
    ) {
      setIsProcessing(true); // 현재 처리 중임을 표시
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        cropImage(imageSrc).then((croppedImage) => {
          handleAddPhoto(croppedImage);
          playSound();
          setPhotoIndex(photoIndex + 1); // 다음 사진 인덱스로
          setCountdown(5); // 다시 5초 카운트다운 시작
          setIsProcessing(false); // 처리 완료 후 false로 변경
        });
      } else {
        setIsProcessing(false); // 이미지가 없을 경우 처리 중 상태 해제
      }
    }

    // 4장의 사진을 모두 찍었으면 촬영 종료
    if (photoIndex >= 4 || photoCount >= 4) {
      setCapturing(false);
    }

    return () => clearTimeout(timer);
  }, [
    capturing,
    countdown,
    handleAddPhoto,
    photoIndex,
    photoCount,
    isProcessing,
  ]);

  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
        style={{ transform: "-scaleX(-1)" }}
        videoConstraints={{
          width: 960,
          height: 1280,
          deviceId: deviceId,
          facingMode: "user",
        }}
      />
      {capturing && countdown > 0 && (
        <div className="countdown-overlay">{countdown}</div>
      )}
      <div className="controls">
        <p>사진 찍은 개수: {photoCount} / 4</p>
        <div
          className={`camera-icon ${capturing ? "capturing" : ""}`}
          onClick={capture}
          title="사진 찍기"
          style={{
            cursor: capturing ? "not-allowed" : "pointer",
            opacity: capturing ? 0.5 : 1,
          }}
        >
          <img src="/camera.png" alt="사진 찍기" />
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
