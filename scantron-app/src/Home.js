import React, { Component } from "react";
import uploadFile from "./FileHandle";
 
class Upload extends Component {

    handleSubmit(event) {
        alert('A name was submitted: ');
        event.preventDefault();
      }

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
                <label>Upload solution file in CSV/JPG/PNG format</label>
                <br></br>
                <input type="file" name="filetoUpload" accept=".jpg, .jpeg, .png, .pdf, .csv"/>
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