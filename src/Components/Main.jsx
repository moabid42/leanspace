// This is the start of your own application!
import LeanspaceWidget from "./LeanspaceWidget";

// Import Material-UI here as necessary, this starter kit has included a table as an example:
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar.jsx";
import "./Main.scss";
import Battery from "./Widgets/Battery.jsx";
import TLEprinter from "./Widgets/Smth";
import Command from "./Widgets/Command";
import Smth from "./Widgets/Smth";
import ScrollableTabsButtonPrevent from "./tabs";

// import View1 from "./Widgets/Widget1";
// This is a basic setup
// Most of the things in this app are automated, such as your tokens on API calls

// We have included a Material UI component, BasicTable from BasicTable.js
// and also included is a Widget.

// Note - the widget does throw some warnings in the console
// It is not something to worry about

{/* <BrowserRouter>
<Routes>
  <Route path="/">
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="users">
      <Route index element={<List />} />
      <Route path=":userId" element={<Single />} />
      <Route
        path="new"
        element={<New inputs={userInputs} title="Add New User" />}
      />
    </Route>
    <Route path="products">
      <Route index element={<List />} />
      <Route path=":productId" element={<Single />} />
      <Route
        path="new"
        element={<New inputs={productInputs} title="Add New Product" />}
      />
    </Route>
  </Route>
</Routes>
</BrowserRouter> */}
const Main = () => {

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <ScrollableTabsButtonPrevent />
          {/* <Battery/>
        <Command/>
        <TLEprinter/> */}
          {/* <Smth/> */}
        </div>
      </div>
    </div>
  );
};
//{"code":"InvalidCredentials","message":"Invalid access token"}

export default Main;
