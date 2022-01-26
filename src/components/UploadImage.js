import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import PropTypes from "prop-types";

// import jpeg from 'jpeg-js';

const MyDropzone = ({ onDropDo }) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log({acceptedFiles})
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
        // const encoded = window.btoa(binaryStr);
        // const encoded = jpeg.encode(binaryStr)
        // console.log(encoded)
        onDropDo(binaryStr);
      }
      reader.readAsArrayBuffer(file)
    })
    // onDropDo(encoded);
  }, [onDropDo])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}
 
MyDropzone.propTypes = {
  onDropDo: PropTypes.func,
}

export default MyDropzone;