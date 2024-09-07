import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { setUser } from '../state';
import { CircularProgress } from '@mui/material';
import { checkFormFields, formDataToJson } from '../utils';
import { httpSignUpStudent } from '../requests.hooks';


function StudentSignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [formDetails, setFormDetails] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        schoolId: "",
        password: "",
        telephone: "",
    })

    function handleChange(event) {
        const { value, name } = event.target;

        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            [name] : value,
        }));
        console.log(formDetails)
    }

    async function submitForm() {
        try {
            const formData = new FormData();
            formData.append('firstName', formDetails.firstName);
            formData.append('lastName', formDetails.lastName);
            formData.append('email', formDetails.email);
            formData.append('schoolId', formDetails.schoolId);
            formData.append('password', formDetails.password);
            formData.append('telephone', formDetails.telephone);
            console.log(formDataToJson(formData))

            const emptyFields = checkFormFields(formDetails);
            if (emptyFields.length > 0) {
                const emptyFieldNames = emptyFields.join(', ');
                alert(`Please fill in the following fields: ${emptyFieldNames}`);
                return
            }

            setLoading(true)
            const response = await httpSignUpStudent(formDataToJson(formData))
            if(response.ok) {
                dispatch(setUser({ user: { type: "student", ...response.body } }))
                navigate("/student/appointmentoverview")
            }

            console.log(response)
        } catch (error) {
            console.log('Failed to register:', error);
        } finally {
            setLoading(false)
        }
    }

    return loading ? <div style={{position: "absolute", marginTop: "200px", marginLeft: "20vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <h1 style={{textAlign: "center", width: "700px"}}>Creating your account and signing you in. Hold on...</h1>
                        <br></br>
                        <CircularProgress sx={{color: "blue"}} size={100} />
                    </div>:
            <div style={{width: "100vw", height: "100vh", backgroundImage: "url(https://res.cloudinary.com/dn6uuvy0b/image/upload/v1725663775/home-bg_h5ru2p.png)"}} className="main_content_iner ">
                <div className="container-fluid p-0">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="dashboard_header mb_50">
                                <div className="row">
                                    <div style={{margin: "10px auto"}} className="col-lg-6">
                                        <div className="dashboard_header_title">
                                            <h3 style={{textAlign: "center"}}>SignUp as a Student</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div style={{background: "transparent", marginTop: "-40px"}} className="white_box mb_30">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6">

                                        <div className="modal-content cs_modal">
                                            <div className="modal-header justify-content-center theme_bg_1">
                                                <h5 className="modal-title text_white">Sign up</h5>
                                            </div>
                                            <div className="modal-body">
                                            <form style={{height: "50vh", overflowY: "auto"}}>
                                                <div>
                                                    <input name='firstName' value={formDetails.firstName} onChange={handleChange} type="text" className="form-control" placeholder="First Name" />
                                                </div>
                                                <div>
                                                    <input name='lastName' value={formDetails.lastName} onChange={handleChange} type="text" className="form-control" placeholder="Last Name" />
                                                </div>
                                                <div>
                                                    <input name='schoolId' value={formDetails.schoolId} onChange={handleChange} type="text" className="form-control" placeholder="Enter your School Student ID" />
                                                </div>
                                                <div>
                                                    <input name="email" value={formDetails.email} onChange={handleChange} type="text" className="form-control" placeholder="Enter your email" />
                                                </div>
                                                <div>
                                                    <input name="telephone" value={formDetails.telephone} onChange={handleChange} type="text" className="form-control" placeholder="Phone Number" />
                                                </div>
                                                <div style={{marginTop: "20px"}}>
                                                    <input name="password" value={formDetails.password} onChange={handleChange} type="password" className="form-control" placeholder="Password" />
                                                </div>
                                                <a onClick={submitForm} href className="btn_1 full_width text-center">Sign up</a>
                                            </form>
                                            </div>
                                        </div>
                                            <p onClick={()=>navigate("/student/login")} style={{color: "blue", fontWeight: 900, cursor: "pointer"}}>Or Login if you already have an account</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default StudentSignUp