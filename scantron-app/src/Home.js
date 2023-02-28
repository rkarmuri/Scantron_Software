import React, { Component } from "react";
 
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.ROOT_URL = "http://localhost:5000";

    this.uploadFileToFlask = this.uploadFileToFlask.bind(this);
    this.uploadToFolder = this.uploadToFolder.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
    uploadFileToFlask(){
      console.log("starting uploadFileToFlask...")
      const files = document.querySelector('[type=file]').files;
      const formData = new FormData();
      const input = document.getElementById('files');
      
      for (let i = 0; i < files.length; i++) {
          let file = files[i]
          
          formData.append('file', file)
      }

      formData.append('file', input.files[0])
      console.log(input.files[0])
      let file_name = input.files[0].name;
      //console.log(file_name);
      console.log("1",file_name);
      const response = this.uploadToFolder(formData, file_name)
    }
  
    handleSubmit(event) {
        alert('File Submission processing...');

        //this.uploadFileToFlask();
        this.uploadFileToFlask();

        event.preventDefault();
      }

      
      uploadToFolder(file, file_name) {
        
        fetch(this.ROOT_URL+'/upload_file', { // Your POST endpoint
          method: 'POST',
          headers: {
            "enctype": "multipart/form-data"
          },
          body: file // This is your file object
        })
        .then(prior => prior.json()).then(
          response => {
            console.log(response)
            if (response.success === "True"){
                      console.log("2",file_name);
              return true
            } else {
              alert('There was an error, please try again. Verify it is a csv file')
              //hideAllElements();
              return false
            }
          } 
        ).catch(
          error => {
                  console.log("ERROR!");
              }
        )
      };
  render() {
    return (
      <div>
                
        <article className="lead">
            <p>Scantron software is an open source application
            that is designed to serve SLU faculty to grade the students' Scantron sheets.</p>
        </article>
        <hr></hr>
        <div className="form-container">
        <h2>Upload your files here</h2>
            <form onSubmit={this.handleSubmit}>
                <label>Upload solution file in PDF format</label>
                <br></br>
                <input type="file" name="filetoUpload" accept=".pdf, .csv"/>
                <br></br>
                <br></br>
                <label>Upload students' answers in PDF format here</label>
                <br></br>
                <input type="file" name="file-uploader" accept=".pdf, .csv"></input>
                <br></br>
                <br></br>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
        
      </div>
    );
  }
}
 
export default Upload;