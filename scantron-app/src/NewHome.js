// import React from 'react';
import React from "react";
import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { Link } from 'react-router-dom';

// const NewHome = (props) => {
//     return (
//         <div>             
//           <article className="lead">
//               <p>Scantron software is an open source application
//               that is designed to serve SLU faculty to grade the students' Scantron sheets.</p>
//           </article>
//           <hr></hr>
//           <div className="form-container">
//           <h2>Upload your files below:</h2>
//               <form onSubmit={SubmitForm()}>
//                   <label>Upload <b>solution</b> file in CSV format</label>
//                   <br></br>
//                   <input type="file" name="fileSolution" accept=".pdf, .csv"/>
//                   <br></br>
//                   <br></br>
//                   <label>Upload students' <b>answers</b> in PDF format here</label>
//                   <br></br>
//                   <input type="file" name="fileAnswers" accept=".pdf, .csv"></input>
//                   <br></br>
//                   <br></br>
//                   <br></br>
//                   <button type="submit">Submit</button>
//               </form>
//           </div>
//         </div>
//       );
// }

const SubmitForm = () => {
    const navigate = useNavigate();
    navigate('/loading');
  };

export default SubmitForm;