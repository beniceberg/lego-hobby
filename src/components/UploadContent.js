import axios from 'axios';
 
import React,{Component} from 'react';
 
class UploadContent extends Component {
    state = {
      // Initially, no file is selected
      selectedFile: null
    };
    onFileChange = event => {
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    };
    
    onFileUpload = () => {
      // Create an object of formData
      const formData = new FormData();
      // Update the formData object
      formData.append(
        "upload",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Details of the uploaded file
      console.log(this.state.selectedFile);
    
      // Request made to the backend api
      // Send formData object
      const url = 'https://lego-hobby.ew.r.appspot.com/upload'
      // const url = 'http://localhost:8000/image-search'
      axios.post(url, formData).then(resp => {
        console.log(JSON.stringify(resp.data));
      });
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
      if (this.state.selectedFile) {
        return (
          <div>
            <h2>File Details:</h2>             
            <p>File Name: {this.state.selectedFile.name}</p>
            <p>File Type: {this.state.selectedFile.type}</p>
            <p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
          </div>
        );
      } else {
        return (
          <div className='dropzone'>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
    
    render() {
    
      return (
        <div>
            <h3>
              File Upload
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default UploadContent;