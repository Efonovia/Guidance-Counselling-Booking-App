import React from 'react';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
        picturePath: null
    })

    function handleChange(event) {
        const { value, name, files } = event.target;

        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            [name]: name === "picturePath" ? files[0] : value,
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
            formData.append('picturePath', formDetails.picturePath)
            console.log(formDataToJson(formData))

            const emptyFields = checkFormFields(formDetails);
            if (emptyFields.length > 0) {
                const emptyFieldNames = emptyFields.join(', ');
                alert(`Please fill in the following fields: ${emptyFieldNames}`);
                return
            }

            setLoading(true)
            const response = await httpSignUpStudent(formData)
            if(response.ok) {
                dispatch(setUser({ user: { type: "student", ...response.body } }))
                navigate("/student/bookappointment")
            }

            console.log(response)
        } catch (error) {
            console.log('Failed to register:', error);
        } finally {
            setLoading(false)
        }
    }

    return loading ? <div style={{position: "absolute", marginTop: "300px", marginLeft: "20vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <h1 style={{textAlign: "center"}}>Creating your account and signing you in. Hold on...</h1>
                        <br></br>
                        <CircularProgress sx={{color: "blue"}} size={100} />
                    </div>:
            <div style={{width: "100vw", height: "100vh", backgroundImage: "url(http://localhost:3000/static/media/home-bg.5bd74799b014ef072512.png)"}} className="main_content_iner ">
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
                                                <div style={{width: "100%"}} className="col-md-12">
                                                    <div style={{border: "1px dashed #2d1967", height: "50px"}} className="input-group">
                                                        <div style={{width: '100%'}} className="custom-file">
                                                            <label style={{display: "flex", width: '100%', height: '100%', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1px"}} className="custom-file-label" htmlFor="inputGroupFile03">
                                                                <span style={{marginTop: "10px", width: '100%', height: '100%'}}> &nbsp;&nbsp;<CloudUploadIcon />&nbsp;Upload a photo of yourself</span>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={handleChange}
                                                                    style={{display: "none"}}
                                                                    name="picturePath"
                                                                    className="custom-file-input"
                                                                    id="inputGroupFile03"
                                                                    aria-describedby="inputGroupFileAddon03"/><br></br><br></br>
                                                                    <span style={{marginTop: "-50px", color: "black"}} id="fileName">{formDetails["picturePath"]?.name}</span>
                                                            </label>
                                                        </div>
                                                    </div>
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