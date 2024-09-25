import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import "./IdolCam.css"; // IdolCam을 위한 스타일링 적용

const idolPoses = [
  "./pose1.png", // 각 포즈 이미지 경로
  "./pose2.png",
  "./pose3.png",
  "./pose4.png",
];

const IdolCam = ({ addPhoto, photoCount, setIsCapturing }) => {
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
      addPhoto(imageSrc); // 부모 컴포넌트로 사진 전달
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
          handleAddPhoto(croppedImage); // 부모 컴포넌트로 사진 전달
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
      setIsCapturing(false); // 부모 컴포넌트의 상태 업데이트
    }

    return () => clearTimeout(timer);
  }, [
    capturing,
    countdown,
    handleAddPhoto,
    photoIndex,
    photoCount,
    isProcessing,
    setIsCapturing, // 의존성 추가
  ]);

  return (
    <div className="idol-webcam-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="idol-webcam"
        style={{ transform: "scaleX(-1)" }}
        videoConstraints={{
          width: 527,
          height: 352,
          deviceId: deviceId,
          facingMode: "user",
        }}
      />
      {capturing && countdown > 0 && (
        <div className="idol-countdown-overlay">{countdown}</div>
      )}
      {/* 아이돌 포즈 이미지 오버레이 */}
      <img
        src={idolPoses[photoIndex]} // 현재 photoIndex에 맞는 포즈 이미지 표시
        alt="Idol Pose"
        className="idol-overlay"
      />
      <div className="idol-controls">
        <p>사진 찍은 개수: {photoCount} / 4</p>
        <div
          className={`idol-camera-icon ${capturing ? "capturing" : ""}`}
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

export default IdolCam;
