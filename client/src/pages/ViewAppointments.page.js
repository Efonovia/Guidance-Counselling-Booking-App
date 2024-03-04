import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';


function ViewAppointments() {
    const userInfo = useSelector(state => state.user)
    function getStatus({completed, cancelled, approved}) {
        if(completed) {
            return "completed"
        } else if(cancelled) {
            return "cancelled"
        } else if(approved && !completed) {
            return "active"
        } else if(!approved && !cancelled) {
            return "pending"
        }
    }

    function getStatusColor(status) {
        switch(status) {
            case "active":
                return {background: "blue"}
            case "completed":
                return {background: "green"}
            case "cancelled":
                return {background: "red"}
            case "pending":
                return {background: "black", color: "white"}
            default:
                return
        }
    }

    

    return <div class="white_card card_height_100 mb_30">
    <div class="white_card_header">
        <div class="box_header m-0">
            <div class="main-title">
                <h3 class="m-0">Data table</h3>
            </div>
        </div>
    </div>
    <div class="white_card_body">
        <div class="QA_section">
            <div class="white_box_tittle list_header">
                <h4>Table</h4>
                <div class="box_right d-flex lms_block">
                    <div class="serach_field_2">
                        <div class="search_inner">
                            <form active="#">
                                <div class="search_field">
                                    <input type="text" placeholder="Search content here..."/>
                                </div>
                                <button type="submit"><SearchIcon /></button>
                            </form>
                        </div>
                    </div>
                    <div class="add_button ms-2">
                        <a href data-bs-toggle="modal" data-bs-target="#addcategory" class="btn_1">Show unapproved appointments</a>
                    </div>
                </div>
            </div>
            <div style={{overflowY: "auto", height: "46vh"}} class="QA_table mb_30">

                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <table class="table lms_table_active dataTable no-footer dtr-inline" id="DataTables_Table_0"
                        role="grid" aria-describedby="DataTables_Table_0_info" style={{width: "697px"}}>
                        <thead>
                            <tr role="row">
                                <th scope="col" class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1" aria-sort="ascending"
                                    aria-label="title: activate to sort column descending">Student ID</th>
                                <th scope="col" class="sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1"
                                    aria-label="Category: activate to sort column ascending">Student Name</th>
                                <th scope="col" class="sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1"
                                    aria-label="Teacher: activate to sort column ascending">Appointment Date</th>
                                <th scope="col" class="sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1"
                                    aria-label="Lesson: activate to sort column ascending">Referrer</th>
                                <th scope="col" class="sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1"
                                    aria-label="Enrolled: activate to sort column ascending">Date Sent</th>
                                <th scope="col" class="sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1"
                                    aria-label="Status: activate to sort column ascending">Status</th>
                                <th scope="col" class="sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1"
                                    aria-label="Status: activate to sort column ascending">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr role="row">
                                <th scope="row" tabindex="0" class="sorting_1"> <a href class="question_content">
                                        title here 1</a></th>
                                <td>Category name</td>
                                <td>Teacher James</td>
                                <td>Lessons name</td>
                                <td>16</td>
                                <td><a href class="status_btn">Active</a></td>
                                <td><a href style={{background: "blue", cursor: "pointer"}} class="status_btn">View & Edit</a></td>
                            </tr>
                            
                            <tr role="row">
                                <th scope="row" tabindex="0" class="sorting_1"> <a href class="question_content">
                                        title here 1</a></th>
                                <td>Category name</td>
                                <td>Teacher James</td>
                                <td>Lessons name</td>
                                <td>16</td>
                                <td><a href class="status_btn">Active</a></td>
                                <td><a style={{background: "blue", cursor: "pointer"}} href class="status_btn">View & Edit</a></td>
                            </tr>
                            
                            <tr role="row">
                                <th scope="row" tabindex="0" class="sorting_1"> <a href class="question_content">
                                        title here 1</a></th>
                                <td>Category name</td>
                                <td>Teacher James</td>
                                <td>Lessons name</td>
                                <td>16</td>
                                <td><a href class="status_btn">Active</a></td>
                                <td><a style={{background: "blue", cursor: "pointer"}} href class="status_btn">View & Edit</a></td>
                            </tr>
                            
                            <tr role="row">
                                <th scope="row" tabindex="0" class="sorting_1"> <a href class="question_content">
                                        title here 1</a></th>
                                <td>Category name</td>
                                <td>Teacher James</td>
                                <td>Lessons name</td>
                                <td>16</td>
                                <td><a href class="status_btn">Active</a></td>
                                <td><a style={{background: "blue", cursor: "pointer"}} href class="status_btn">View & Edit</a></td>
                            </tr>
                            
                            <tr role="row">
                                <th scope="row" tabindex="0" class="sorting_1"> <a href class="question_content">
                                        title here 1</a></th>
                                <td>Category name</td>
                                <td>Teacher James</td>
                                <td>Lessons name</td>
                                <td>16</td>
                                <td><a href class="status_btn">Active</a></td>
                                <td><a style={{background: "blue", cursor: "pointer"}} href class="status_btn">View & Edit</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
}


export default ViewAppointments