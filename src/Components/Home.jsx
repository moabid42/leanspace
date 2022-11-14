import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar.jsx";
import React from 'react';
import { Clock } from "./Clock";
import { Countdown } from "./CountDown";
import { useState } from 'react';
// import ReactGlobe from 'react-globe';
import "./Home.scss";

const Home = () => {

    const [message, setMessage] = useState(null);

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Clock />
                    <Countdown event={e => setMessage("The world has been destroyed! :(")} />
                    {
                        message && (
                            <div className='message'>
                                {message}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
//{"code":"InvalidCredentials","message":"Invalid access token"}

export default Home;