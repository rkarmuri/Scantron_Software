import React, { Component } from "react";
// import Form from "./Form";
import axios from "axios";
 
class Upload extends Component {

  submitForm () {
    //const files = document.querySelector('[type=file]').files;
    const fileSolution =  document.querySelector('[name=fileSolution]').files;
    const fileAnswers =  document.querySelector('[name=fileAnswers]').files;
    const formData = new FormData();
    //formData.append("name", name);
    //formData.append("file", selectedFile);
    console.log(fileSolution[0]);
    console.log(fileAnswers[0]);
    console.log("-------------------")

    formData.append('fileSolution', fileSolution[0]);
    formData.append('fileAnswers', fileAnswers[0]);
    // for (let i = 0; i < files.length; i++) {
    //   let file = files[i]
    //   console.log(file);
    //   formData.append('file', file)
    // }
  
    axios
      .post("http://localhost:5000/upload_file", formData)
      .then((res) => {
        alert("File Upload success");
        console.log(res);
      })
      .catch((err) => alert("File Upload Error"));
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
            <form onSubmit={this.submitForm}>
                <label>Upload solution file in PDF format</label>
                <br></br>
                <input type="file" name="fileSolution" accept=".pdf, .csv"/>
                <br></br>
                <br></br>
                <label>Upload students' answers in PDF format here</label>
                <br></br>
                <input type="file" name="fileAnswers" accept=".pdf, .csv"></input>
                <br></br>
                <br></br>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
        {/* <Form></Form> */}
      </div>
    );
  }
}
 
export default Upload;