import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNodes } from '../hooks/nodes';
import Tabs from '@mui/material/Tabs';
import { useWidgets } from '../hooks/widgets';
import LeanspaceWidget from './LeanspaceWidget';
import { useMetrics } from '../hooks/metrics';
import './tabs.css';
import image from './satellite-256.png';
import { TableContainer } from '@mui/material';
import './buttom.css'

export default function ScrollableTabsButtonPrevent() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { data: widgets } = useWidgets();
    console.log(widgets);

    const { data: metrics } = useMetrics();

    const { data: nodes } = useNodes({ kinds: "SATELLITE" });
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <div>
                <TabContext value={value}>
                    <Box sx={{ maxWidth: { xs: 320, sm: 780 }, bgcolor: 'background.paper' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            {nodes?.content.map((node, index) => (
                                <Tab label={node.name} value={index} />
                            ))}
                        </Tabs>
                    </Box>
                    <div styles={{ display: "flex" }}>
                        {nodes?.content.map((node, index) => (
                            <TabPanel value={index}>
                                <TableContainer style={{ backgroundImage: `url(${image})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right", backgroundSize: "30%" }}>
                                    <TableRow
                                        key={node.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <h5>Name</h5>
                                        </TableCell>
                                        <TableCell align="right">{node.name}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={node.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <h5>ID</h5>
                                        </TableCell>
                                        <TableCell align="right">{node.id}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={node.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <h5>Type</h5>
                                        </TableCell>
                                        <TableCell align="right">{node.type}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={node.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <h5>Kind</h5>
                                        </TableCell>
                                        <TableCell align="right">{node.kind}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={node.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <h5>Description</h5>
                                        </TableCell>
                                        <TableCell align="right">{node.description}</TableCell>
                                    </TableRow>
                                </TableContainer>
                            </TabPanel>
                        ))}
                    </div>
                    {widgets?.content.map((widget) => (
                        <LeanspaceWidget widgetId={widget.id} />
                    ))}
                </TabContext>
                <div className="gauges">
                    <div className="wig">
                        <LeanspaceWidget widgetId="dc3813a2-ca26-4616-89b0-5f174e7d48bf" />
                    </div>
                    <div className="wig">
                        <LeanspaceWidget widgetId="48e8f7eb-96a0-4d67-97fd-01933c8c587a" />
                    </div>
                    <div className="wig">
                        <LeanspaceWidget widgetId="ce37aa8d-4619-4b45-8928-3600e3a86d4d" />
                    </div>
                </div>
            </div>
        </Box >
    );
}
