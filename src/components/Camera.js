import React from "react";
import Webcam from "react-webcam";
import axios from 'axios';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const DataURIToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

const Camera = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc)
      const file = DataURIToBlob(imageSrc)
      const formData = new FormData();
      formData.append('upload', file, 'image.jpg')

      const url = 'https://lego-hobby.ew.r.appspot.com/upload'
      axios.post(url, formData).then(resp => {
        console.log(resp.data);
      });
    },
    [webcamRef]
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
      <button onClick={capture}>Capture photo</button>
    </>
  );
};

export default Camera