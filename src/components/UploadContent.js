import React,{Component} from 'react';
import Image from './Image';
 
class UploadContent extends Component {
    onFileChange = event => {
      this.props.onFileSelected(event.target.files[0]);
    };
    
    render() {
      const { fileSelected } = this.props;
      return (
        <div>
          <h3>
            File Upload
          </h3>
          <div>
            <input
              type="file"
              onChange={this.onFileChange}
              // className="tvhBtn"
            />
          </div>
          {fileSelected && (
            <div>
              <h2>File Details:</h2>             
              <p>File Name: {fileSelected.name}</p>
              <p>File Type: {fileSelected.type}</p>
              <Image rawData={fileSelected} />
            </div>
          )}
        </div>
      );
    }
  }
 
  export default UploadContent;