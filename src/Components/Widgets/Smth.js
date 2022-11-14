import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNodes } from '../../hooks/nodes';
import { useTLE } from '../../hooks/tle';

// This is a Basic Table component using Material UI
// Its purpose is to use the data from the API call
// mapping it into the table cells below

// Also note that we have created a destructured variable
// which is used to not call everything 'data'

// There is a hook useNodes, which is a GET for all of the nodes
// see the hooks file in the hooks folder for more info

export default function TLEprinter() {
    // const { data: nodes } = useNodes();

    // return (
    //   <TableContainer component={Paper}>
    //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>ID</TableCell>
    //           <TableCell>KIND</TableCell>
    //           <TableCell>TYPE</TableCell>
    //           <TableCell>NAME</TableCell>
    //           <TableCell>DESC</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {nodes?.content.map((node) => (
    //           <TableRow key={node.id}>
    //             <TableCell>{node.id}</TableCell>
    //             <TableCell>{node.kind}</TableCell>
    //             <TableCell>{node.type}</TableCell>
    //             <TableCell>{node.name}</TableCell>
    //             <TableCell>{node.description}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // );
    const { data: properties } = useTLE();
    // console.log("properties", properties);

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>VALUE1</TableCell>
              <TableCell>VALUE2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties?.content.map((propertie) => (
              <TableRow key={propertie.id}>
                <TableCell>{propertie.id}</TableCell>
                <TableCell>{propertie.value[0]}</TableCell>
                <TableCell>{propertie.value[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }