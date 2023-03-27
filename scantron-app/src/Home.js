import React, { Component } from "react";
import axios from "axios";

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
    this.setState({ isLoading: true });
    this.setState({ showResults: false});
    const fileSolution =  document.querySelector('[name=fileSolution]').files;
    const fileAnswers =  document.querySelector('[name=fileAnswers]').files;
    const formData = new FormData();

    console.log(fileSolution[0]);
    console.log(fileAnswers[0]);
    console.log("-------------------")

    formData.append('fileSolution', fileSolution[0]);
    formData.append('fileAnswers', fileAnswers[0]);

    axios
      .post("http://localhost:5000/upload_file", formData)
      .then((res) => {
        
        console.log(res);
        //submitted = true;   
        this.setState({ isLoading: false });
        this.setState({ showResults: true});
        alert("File Upload success");
      })
      .catch((err) => {
        alert("File Upload Error");
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="form-container">
            Loading...
        </div>
      )
    }

    if(this.state.showResults){
      return(
        <div>
          <div className="form-container">
            <h2>Results Here:</h2>
            {/* <p><a href='../../back-end python/temp/grades.csv' download>grades.csv</a></p> */}
            <p><a href='../grades.csv' download>Grades.csv</a></p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p><a href='/'>Start Over</a></p>
          </div>

        </div>
      )
    }

    
    return (
      <div>
        <div className="header-content">
          <article className="lead">
              <p>Scantron software is an open source application
              that is designed to serve SLU faculty to grade the students' Scantron sheets.</p>
          </article>
          <hr></hr>
        </div>          
        
        <div className="form-container">
        <h2>Upload your files below:</h2>
            <form onSubmit={this.submitForm}>
                <label>Upload <b>solution</b> file in CSV format</label>
                <br></br>
                <input className="btn-input" type="file" name="fileSolution" accept=".pdf, .csv"/>
                <br></br>
                <br></br>
                <label>Upload students' <b>answers</b> in PDF format here</label>
                <br></br>
                <input className="btn-input" type="file" name="fileAnswers" accept=".pdf, .csv"></input>
                <br></br>
                <br></br>
                <br></br>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
        </div>
      </div>
    );
  }
}
 
export default Upload;