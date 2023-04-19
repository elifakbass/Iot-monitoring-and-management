import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
import { useData } from '../context';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';


function createData(cihazIsmi, göstergeIsmi) {
  return { cihazIsmi, göstergeIsmi};
}


export default function TableGösterge(props) {
    const {name} =useData();
    const [filteredRows, setFilteredRows] = useState([]);
    const rows = [
        createData(name, "Temperature_SN-001"),

      ];

      
     useEffect(() => {
      if(props.parametre===undefined || props.parametre===""){
        setFilteredRows(rows);
      }
      else{
        const filtered = rows.filter((row) => {
          return row.cihazIsmi === props.parametre;
        });
        setFilteredRows(filtered);
      }
      
    }, [props.parametre]);
  return (
    <TableContainer component={Paper} sx={{ minWidth: 1000 ,marginLeft:"200px",marginTop:"20px"}} elevation={0} >
      <Table sx={{ maxWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cihaz İsmi</TableCell>
            <TableCell align="left">Gösterge</TableCell>  
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                borderBottom: '1px solid #ccc',
                marginTop: 5,
                cursor: 'pointer', // add cursor style to indicate clickable
                textDecoration:'none'
              }}
              component={Link} // wrap TableRow in Link component
              to={`${name}`} // set the target link URL
              
            >
              <TableCell component="th" scope="row">
                {row.cihazIsmi}
              </TableCell>
              <TableCell align="left">{row.göstergeIsmi}</TableCell>
              
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}