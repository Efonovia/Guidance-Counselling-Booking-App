import React from 'react';
import nileLogo from "../assets/img/nile.png"
import "../styles/home.css"
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate()

    return <main className='home-main'>
                <header className='home-header'>
                    <img src={nileLogo} alt="nile logo"></img>
                    <h1>Welcome to Nile Guidance Counselling </h1>
                </header>

                <div className='main-content'>
                    <h1>What is your Role?</h1>
                    <div className='auth-options'>
                        <div onClick={() => navigate("/student/login")} className='student'>Student</div>
                        <div onClick={() => navigate("/counselor/login")} className='counselor'>Counselor</div>
                    </div>
                </div>
            </main>
}


export default Home