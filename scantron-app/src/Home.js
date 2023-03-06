import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
 
class Upload extends Component {
  constructor(props){
    super(props);

    this.state = {
      submitted: null
    };
    
    this.submitForm = this.submitForm.bind(this);

  }
  

  submitForm (e) {
    e.preventDefault();
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
    let submitted = null;
    axios
      .post("http://localhost:5000/upload_file", formData)
      .then((res) => {
        alert("File Upload success");
        console.log(res);
        submitted = true;
        // this.setState({submitted});
       // navigate('/loading');
        
      })
      .catch((err) => {
        alert("File Upload Error")
        submitted = null;
      });
      this.setState({submitted});
  };

  render() {

    let {submitted} = this.state;
    return (
      <div>             
        <article className="lead">
            <p>Scantron software is an open source application
            that is designed to serve SLU faculty to grade the students' Scantron sheets.</p>
        </article>
        <hr></hr>
        <div className="form-container">
        { 
          submitted == true && (<Navigate to="/Loading" replace={true} />
        )}
        <h2>Upload your files below:</h2>
            <form onSubmit={this.submitForm}>
                <label>Upload <b>solution</b> file in CSV format</label>
                <br></br>
                <input type="file" name="fileSolution" accept=".pdf, .csv"/>
                <br></br>
                <br></br>
                <label>Upload students' <b>answers</b> in PDF format here</label>
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