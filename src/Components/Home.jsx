import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar.jsx";
import React from 'react';
import { Clock } from "./Clock";
import { Countdown } from "./CountDown";
import { useState } from 'react';
import Chart from "./chart";
// import ReactGlobe from 'react-globe';
import "./Home.scss";
import BasicTable from "./BasicTable";
import { userData } from "./data"
import { red } from "@mui/material/colors";
import { withTheme } from "@emotion/react";
import background from "./background.png";
import SendCurl from "./SendCurl";

const Home = ({ countDownData }) => {
    console.log('from home', countDownData)
    const [message, setMessage] = useState(null);
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                {/* <div className="widgets" style={{backgroundImage:`url('./background.png')`,  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}> */}
                <div className="widgets">
                    <div className="Top">
                        <Clock />
                        <div className="rightTop">
                            <Countdown event={e => setMessage("The world has been destroyed! :(")} countDownData={countDownData} />
                            {
                                message && (
                                    <div className='message'>
                                        {message}
                                    </div>
                                )
                            }
                            <div className="buttons">
                                <BasicTable />
                                <SendCurl requestId={"e39ee04f-5c8e-4553-95fb-2ec7dfb3eb4d"} imageId={"e983d6c5-f2cd-4a61-80b1-20b28c9c5773"} />
                            </div>
                        </div>
                    </div>
                    <div className="background">
                        <img src={background} alt="background" />
                    </div>
                    <Chart data={userData} title="Number of Requests" grid dataKey="Active requests received" />
                </div>
            </div>
        </div>
    );
};
//{"code":"InvalidCredentials","message":"Invalid access token"}

export default Home;