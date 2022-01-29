import React from "react";
import Webcam from "react-webcam";
import { DataURIToBlob } from "../_utils";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const Camera = ({ onFileSelected }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const file = DataURIToBlob(imageSrc)
      onFileSelected(file);
    },
    [webcamRef, onFileSelected]
  );

  return (
    <>
      <Webcam
        audio={false}
        height={180}
        // height={720} w*9/16
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        // width={1280}
        videoConstraints={videoConstraints}
      />
      <button
        onClick={capture}
        className="tvhBtn"
      >
        Capture photo
      </button>
    </>
  );
};

export default Camera