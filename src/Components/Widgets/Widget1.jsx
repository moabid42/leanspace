// This is the start of your own application!
import LeanspaceWidget from "./LeanspaceWidget";

// Import Material-UI here as necessary, this starter kit has included a table as an example:
import BasicTable from "./BasicTable.js";
import LabTabs from "./Tabs.js";


// This is a basic setup
// Most of the things in this app are automated, such as your tokens on API calls

// We have included a Material UI component, BasicTable from BasicTable.js
// and also included is a Widget.

// Note - the widget does throw some warnings in the console
// It is not something to worry about



const View1 = () => {

  return (
    <>
      <h2>Material UI Table</h2>
      <p>This utilizes our API GET request for satellites and then renders them below in a table format</p>
      <BasicTable />
      <h2>Leanspace Widget</h2>
      <p>Here is live data from our Leanspace Services - To learn how to do this, check out the starter kit docs</p>
      {/* <LeanspaceWidget widgetId="d36916f4-1120-4cef-927a-9a77bef1fd4c" /> */}
      <LeanspaceWidget widgetId="6b843c45-018e-49c4-ad1e-17a399d698f8"/>
      {/* <LeanSpaceWidget widgetId="6b843c45-018e-49c4-ad1e-17a399d698f8"/> */}
    </>
  );
};
//{"code":"InvalidCredentials","message":"Invalid access token"}

export default View1;
