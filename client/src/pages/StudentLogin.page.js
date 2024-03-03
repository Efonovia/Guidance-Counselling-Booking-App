import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkFormFields, formDataToJson } from '../utils';
import { setUser } from '../state';
import { httpLoginStudent } from '../requests.hooks';
import { CircularProgress } from '@mui/material';



function StudentLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [formDetails, setFormDetails] = React.useState({
        schoolId: "",
        password: "",
    })

    function handleChange(event) {
        const { value, name } = event.target;

        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            [name]: value,
        }));
        console.log(formDetails)
    }

    async function submitForm() {
        try {
            const formData = new FormData();
            formData.append('schoolId', formDetails.schoolId);
            formData.append('password', formDetails.password);
            console.log(formDataToJson(formData))

            const emptyFields = checkFormFields(formDetails);
            if (emptyFields.length > 0) {
                const emptyFieldNames = emptyFields.join(', ');
                alert(`Please fill in the following fields: ${emptyFieldNames}`);
                return
            }

            setLoading(true)
            const response = await httpLoginStudent(formDetails)
            if(response?.ok) {
                dispatch(setUser({ user: { type: "student", ...response.body } }))
                navigate("/student/bookappointment")
            }
            console.log(response)
        } catch (error) {
            setLoading(false)
            console.error('Failed to log you in:', error);
        } finally {
            setLoading(false)
        }
    }

    return loading ? <div style={{position: "absolute", marginTop: "300px", marginLeft: "20vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <h1 style={{textAlign: "center"}}>Signing you in. Hold on...</h1>
                        <br></br>
                        <CircularProgress sx={{color: "blue"}} size={100} />
                    </div>: <div style={{width: "100vw", height: "100vh", backgroundImage: "url(http://localhost:3000/static/media/home-bg.5bd74799b014ef072512.png)"}} className="main_content_iner ">
                <div className="container-fluid p-0">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="dashboard_header mb_50">
                                <div className="row">
                                    <div style={{margin: "0 auto"}} className="col-lg-6">
                                        <div style={{marginTop: "20%"}} className="dashboard_header_title">
                                            <h3 style={{textAlign: "center"}}>Login as a Student</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div style={{background: "transparent"}} className="white_box mb_30">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6">

                                        <div className="modal-content cs_modal">
                                            <div className="modal-header justify-content-center theme_bg_1">
                                                <h5 className="modal-title text_white">Log in</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="">
                                                        <input name='schoolId' value={formDetails.schoolId} onChange={handleChange} type="text" className="form-control" placeholder="Enter your school ID"/>
                                                    </div>
                                                    <div className="">
                                                        <input name='password' value={formDetails.password} onChange={handleChange} type="password" className="form-control" placeholder="Password"/>
                                                    </div>
                                                    <a onClick={submitForm} href className="btn_1 full_width text-center">Log in</a>
                                                </form>
                                            </div>
                                        </div>
                                            <p onClick={()=>navigate("/student/signup")} style={{color: "blue", fontWeight: 900, cursor: "pointer"}}>Or Signup if you don't have an account</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default StudentLogin