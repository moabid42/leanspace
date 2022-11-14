import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar.jsx";
import "./Main.scss";
import TLEprinter from "./Widgets/Smth";

const TLE = () => {

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    {/* <ScrollableTabsButtonPrevent />
                    <Battery />
                    <Command /> */}
                    <TLEprinter />
                    {/* <Smth /> */}
                </div>
            </div>
        </div>
    );
};
//{"code":"InvalidCredentials","message":"Invalid access token"}

export default TLE;