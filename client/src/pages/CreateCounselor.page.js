import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { checkFormFields, formDataToJson } from '../utils';
import { httpCreateCounselor } from '../requests.hooks';
import { CircularProgress } from '@mui/material';


function CreateCounselor() {

    const [loading, setLoading] = React.useState(false)
    const [formDetails, setFormDetails] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        telephone: "",
        picturePath: null,
        isAdmin: false
    })

    function handleChange(event) {
        const { value, name, files, type, checked } = event.target;
        if (type === 'checkbox') {
            setFormDetails(prevFormDetails => ({
                ...prevFormDetails,
                [name]: checked,
            }));
        } else {
            setFormDetails(prevFormDetails => ({
                ...prevFormDetails,
                [name]: name === "picturePath" ? files[0] : value,
            }));
        }
        console.log(formDetails)
    }

    async function submitForm() {
        try {
            const formData = new FormData();
            formData.append('firstName', formDetails.firstName);
            formData.append('lastName', formDetails.lastName);
            formData.append('email', formDetails.email);
            formData.append('password', formDetails.password);
            formData.append('telephone', formDetails.telephone);
            formData.append('picturePath', formDetails.picturePath)
            formData.append('isAdmin', formDetails.isAdmin)
            console.log(formDataToJson(formData))

            const emptyFields = checkFormFields(formDetails);
            if (emptyFields.length > 0) {
                const emptyFieldNames = emptyFields.join(', ');
                alert(`Please fill in the following fields: ${emptyFieldNames}`);
                return
            }

            setLoading(true)
            const response = await httpCreateCounselor(formData)
            if(!response.exists) {
                alert("Counselor created successfully")
            }

            console.log(response)
        } catch (error) {
            console.log('Failed to create:', error);
        } finally {
            setLoading(false)
            setFormDetails({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                telephone: "",
                picturePath: null,
                isAdmin: false
            })
        }
    }

    return loading ? <div style={{position: "absolute", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <h1 style={{textAlign: "center"}}>Creating new counselor. Hold on...</h1>
                <br></br>
                <CircularProgress sx={{color: "blue"}} size={100} />
            </div>:
            <div className="white_box mb_30">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="modal-content cs_modal">
                            <div className="modal-header theme_bg_1 justify-content-center">
                                <h5 className="modal-title text_white">Create a New Counselor</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <input name='firstName' value={formDetails.firstName} onChange={handleChange} type="text" className="form-control" placeholder="First Name" />
                                    </div>
                                    <div>
                                        <input name='lastName' value={formDetails.lastName} onChange={handleChange} type="text" className="form-control" placeholder="Last Name" />
                                    </div>
                                    <div>
                                        <input name='email' value={formDetails.email} onChange={handleChange} type="text" className="form-control" placeholder="Enter your email" />
                                    </div>
                                    <div>
                                        <input name='telephone' value={formDetails.telephone} onChange={handleChange} type="text" className="form-control" placeholder="Phone Number" />
                                    </div>
                                    <div style={{width: "100%"}} className="col-md-12">
                                        <div style={{border: "1px dashed #2d1967", height: "60px"}} className="input-group">
                                            <div className="custom-file">
                                                <label style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "15px"}} className="custom-file-label" htmlFor="inputGroupFile03">
                                                    <span style={{marginTop: "10px"}}> &nbsp;&nbsp;<CloudUploadIcon />&nbsp;Upload photo of counselor</span>
                                                    <input
                                                        type="file"
                                                        accept='image/*'
                                                        name='picturePath' 
                                                        onChange={handleChange}
                                                        style={{display: "none"}}
                                                        className="custom-file-input"
                                                        id="inputGroupFile03"
                                                        aria-describedby="inputGroupFileAddon03"/><br></br>
                                                        <span style={{marginTop: "-50px", color: "black"}} id="fileName">{formDetails["picturePath"]?.name}</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop: "20px"}}>
                                        <input name='password' value={formDetails.password} onChange={handleChange} type="password" className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="cs_check_box">
                                        <input name='isAdmin' checked={formDetails.isAdmin} onChange={handleChange} type="checkbox" id="check_box" className="common_checkbox" />
                                        <label className="form-label" htmlFor="check_box">
                                            Make admin?
                                        </label>
                                    </div>
                                    <a onClick={submitForm} href className="btn_1 full_width text-center">Create</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default CreateCounselor