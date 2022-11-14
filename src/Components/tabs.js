import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Battery from './Widgets/Battery';
import TLEprinter from "./Widgets/Smth";
import { useNodes } from '../hooks/nodes';
import Tabs from '@mui/material/Tabs';
// import BasicTable from "./Widgets/BasicTable";


// export default function LabTabs() {
//     const [value, setValue] = React.useState('1');

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const { data: nodes } = useNodes();

//     return (
//         <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
//             <TabContext
//                 value={value}
//                 onChange={handleChange}
//                 variant="scrollable"
//                 scrollButtons={false}
//                 aria-label="scrollable prevent tabs example"
//             >
//                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                     <TabList onChange={handleChange} aria-label="lab API tabs example">
//                         {nodes?.content.map((node) => (
//                             <Tab label={node.name} value={node.id} />
//                         ))}
//                     </TabList>
//                 </Box>
//                 <TabPanel value="1">smth</TabPanel>
//                 <TabPanel value="2"><TLEprinter /></TabPanel>
//                 <TabPanel value="3"><Battery /></TabPanel>
//             </TabContext>
//         </Box>
//     );
// }



export default function ScrollableTabsButtonPrevent() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { data: nodes } = useNodes({ kinds: "SATELLITE" });
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {nodes?.content.map((node) => (
                        <Tab label={node.name}/>
                    ))}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>smth</TabPanel>
        </Box>
    );
}