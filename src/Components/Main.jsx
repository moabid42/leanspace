// This is the start of your own application!
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar.jsx";
import "./Main.scss";
import ScrollableTabsButtonPrevent from "./tabs";


const Main = () => {

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <ScrollableTabsButtonPrevent />
          </div>
        </div>
      </div>
    </>
  );
};
//{"code":"InvalidCredentials","message":"Invalid access token"}

export default Main;
