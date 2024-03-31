import { CircularProgress } from '@mui/material';
import React from 'react';
import { httpGetAllCounselors, httpGetCounselor } from '../requests.hooks';


function ViewAllCounselors() {
    const [listOfCounselors, setListOfCounselors] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [selectedCounselor, setSelectedCounselor] = React.useState(null)
    const [currentCounselorDetails, setCurrentCounselorDetails] = React.useState(null)
    const [currentCounselorDetailsLoading, setCurrentCounselorDetailsLoading] = React.useState(true)

    async function viewCounselorInfo(counselorId) {
        setSelectedCounselor(counselorId)
        try {
            const response = await httpGetCounselor(counselorId)
            setCurrentCounselorDetails(response)
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setCurrentCounselorDetailsLoading(false)
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpGetAllCounselors();
                setListOfCounselors(result);
            } catch (error) {
                console.error('Error fetching appointment:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    }, [])

    const listOfCounselorsHTML = listOfCounselors?.map(counselor => {
        return <li onClick={() => viewCounselorInfo(counselor._id)} style={{cursor: "pointer"}} key={counselor._id}>
                <a href>
                    <div className="message_pre_left">
                        <div className="message_preview_thumb">
                            <img style={{objectFit: "cover"}} src={`http://localhost:8000/counselors/pic/${counselor.picturePath}`} alt=""/>
                        </div>
                        <div className="messges_info">
                            <h4>{counselor.firstName} {counselor.lastName}</h4>
                        </div>
                    </div>
                </a>
            </li>
    })

    return loading ? <CircularProgress size={100} sx={{color:'black', margin: "150px 400px"}}/> : <div id='view_all_counselors' className="messages_box_area">
    <div className="messages_list">
        <div className="white_box ">
            <div className="white_box_tittle list_header">
                <h4 style={{textAlign: "center"}}>All Counselors</h4>
            </div>
            <ul style={{height: "50vh", overflowY: "auto"}}>{listOfCounselorsHTML}</ul>
        </div>
    </div>
    <div className="messages_chat mb_30">
        {!Boolean(selectedCounselor) ? <h1 style={{textAlign: "center", color: "black", fontSize: "24px"}}>Select a counselor to view their information</h1> : 
        ((Boolean(selectedCounselor) && currentCounselorDetailsLoading) ? <CircularProgress size={100} sx={{color:'black', marginTop: "150px", marginLeft: "200px"}}/> : <div style={{height: "77vh", overflowY: "auto", alignItems: "start", gap: "10px"}} className="white_box cen-col">
            <h2 style={{paddingBottom: "20px", color: "black"}}>Counselor Details</h2>
            <img style={{objectFit: "cover"}} height={60} width={80} src={`http://localhost:8000/counselors/pic/${currentCounselorDetails?.picturePath}`} alt=""></img>
            <h3 style={{paddingTop: "15px", fontSize: "24px"}}>First Name:&nbsp;<span>{currentCounselorDetails?.firstName}</span></h3>
            <h3 style={{paddingTop: "15px", fontSize: "24px"}}>Last Name:&nbsp;<span>{currentCounselorDetails?.lastName}</span></h3>
            <h3 style={{paddingTop: "15px", fontSize: "24px"}}>Email&nbsp;<span>{currentCounselorDetails?.email}</span></h3>
            <h3 style={{paddingTop: "15px", fontSize: "24px"}}>Phone Number:&nbsp;<span>{currentCounselorDetails?.telephone}</span></h3>
            <h3 style={{paddingTop: "15px", fontSize: "24px"}}>Is an admin?:&nbsp;<span>{currentCounselorDetails?.isAdmin ? "Yes" : "No"}</span></h3>
        </div>)}
    </div>
</div>
}


export default ViewAllCounselors