import React, { Component } from "react";
import './AdmissionForm.css'

class AdmissionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studName: '',
            dob: '',
            gender: 'select',
            clas: 'select',
            division: 'select',
            formErrors: {},
            selectedOption: '',
            student: {}

        };

        this.initialState = this.state;
    }

    handleOptionChange = (e) => {
        this.setState({ selectedOption: e.target.value });
    }
    handleFormValidation() {
        const { studName, dob, gender, clas, division } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //Student name     
        if (studName === " ") {
            formIsValid = false;
            formErrors["studNameErr"] = "Name is required.";
        }

        if (typeof studName !== "undefined") {
            if (!studName.match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                formErrors["studNameErr"] = "Only letters";
            }
        }

        //DOB    
        if (!dob) {
            formIsValid = false;
            formErrors["dobErr"] = "Date of birth is required.";
        }
        else {
            var pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
            if (!pattern.test(dob)) {
                formIsValid = false;
                formErrors["dobErr"] = "Invalid date of birth";
            }
        }

        //Gender    
        if (gender === '' || gender === "select") {
            formIsValid = false;
            formErrors["genderErr"] = "Select gender.";
        }

        //Class    
        if (clas === '' || clas === "select") {
            formIsValid = false;
            formErrors["clasErr"] = "Select class.";
        }

        //division
        if (division === '' || division === "select") {
            formIsValid = false;
            formErrors["diviErr"] = "Select division.";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // if (this.handleFormValidation()) {
        //     this.setState(this.initialState);
        // }
            const response = fetch('http://localhost:8080/admission/student/savedetails', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": this.state.studName,
                    "dob": this.state.dob,
                    "standard": this.state.clas,
                    "division": this.state.division,
                    "gender": this.state.selectedOption
                })
            }).then((res) => res.json())
                .then(res => {
                    console.log("Response", res);
                    this.setState({ student: res })
                })
            alert('You have been successfully registered.');
           

       
       
    }

    render() {

        const { studNameErr, dobErr, genderErr, diviErr, clasErr } = this.state.formErrors;

        return (
            <div>
                <div className="formDiv">
                    <h3 style={{ textAlign: "center" }} >Student Registration Form </h3>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor="studName">Name</label>
                                <input type="text" name="studName"
                                    value={this.state.studName}
                                    onChange={this.handleChange}
                                    placeholder="Your name.."
                                    className={studNameErr ? ' showError' : ''} />
                                {studNameErr &&
                                    <div style={{ color: "red", paddingBottom: 10 }}>{studNameErr}</div>
                                }

                            </div>
                            <div>
                                <label htmlFor="text">Birth Date</label>
                                <input type="text" name="dob"
                                    value={this.state.dob}
                                    onChange={this.handleChange}
                                    placeholder="DD/MM/YYYY.."
                                    className={dobErr ? ' showError' : ''} />
                                {dobErr &&
                                    <div style={{ color: "red", paddingBottom: 10 }}>{dobErr}</div>
                                }
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="text">Gender</label>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="male"
                                                checked={this.state.selectedOption === 'male'}
                                                onChange={this.handleOptionChange} />


          Male
          </label>

                                        <label>
                                            <input type="radio" value="female" checked={this.state.selectedOption === 'female'}
                                                onChange={this.handleOptionChange} />

          Female
          </label>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <label htmlFor="clas">Class</label>
                                <select name="clas"
                                    value={this.state.clas}
                                    onChange={this.handleChange}
                                    className={clasErr ? ' showError' : ''} >
                                    <option value="select">--Select--</option>
                                    <option value="1">I</option>
                                    <option value="2">II</option>
                                    <option value="3">III</option>
                                    <option value="4">IV</option>
                                    <option value="5">V</option>
                                    <option value="6">VI</option>
                                    <option value="7">VII</option>
                                    <option value="8">VIII</option>
                                    <option value="9">IX</option>
                                    <option value="10">X</option>
                                    <option value="11">XI</option>
                                    <option value="12">X12</option>
                                </select>
                                {clasErr &&
                                    <div style={{ color: "red", paddingBottom: 10 }}>{clasErr}</div>
                                }
                            </div>
                            <div>
                                <label htmlFor="division">Division</label>
                                <select name="division"
                                    value={this.state.division}
                                    onChange={this.handleChange}
                                    className={diviErr ? ' showError' : ''} >
                                    <option value="select">--Select--</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>

                                </select>
                                {diviErr &&
                                    <div style={{ color: "red", paddingBottom: 10 }}>{diviErr}</div>
                                }
                            </div>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>

                <div>Student Details
                <div> Name : {this.state.student.name}</div>
                    <div>  Date of Birth {this.state.student.dob}</div>
                    <div>  Roll No :{this.state.student.rollno}</div>
                    <div>  Gender : {this.state.student.gender}</div>
                    <div> Standard :  {this.state.student.standard}</div>
                    <div> Division : {this.state.student.division}</div>
                </div>
            </div>
        )
    }
}

export default AdmissionForm;