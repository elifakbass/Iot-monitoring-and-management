import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useData } from '../context';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, Link } from '@mui/material';
import { useEffect,useState } from 'react';
import Modal from './Modal';

function createData(isim, tip) {
  return { isim, tip};
}




export default function TableCihaz(props) {
    const {name} =useData();
    const [filteredRows, setFilteredRows] = useState([]);
    const rows = [
        createData(name, "default"),
        createData("SN-002", "default"),
      ];

      
     useEffect(() => {
      if(props.parametre===undefined || props.parametre===""){
        setFilteredRows(rows);
      }
      else{
        const filtered = rows.filter((row) => {
          return row.isim === props.parametre;
        });
        setFilteredRows(filtered);
      }
      
    }, [props.parametre]);
     
 
  return (
    <TableContainer component={Paper} sx={{ minWidth: 1000 ,marginLeft:"200px",marginTop:"20px"}} elevation={0} >
      <Table sx={{ maxWidth: 1000 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Cihaz İsmi</TableCell>
            <TableCell align="left">Cihaz Tipi</TableCell>
            <TableCell/>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          { filteredRows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0} , marginTop:"5px",borderBottom: '1px solid #ccc'}}
            >
              <TableCell component="th" scope="row"  >
                {row.isim}
              </TableCell>
              <TableCell align="left"  >{row.tip}</TableCell>
              <TableCell align='right' >{<Modal/>}</TableCell>
              <TableCell align="right" sx={{width:'30px'}} elevation={0} >{<Link href={`gostergeler/${name}` } color="#595959"><DashboardIcon/></Link>}</TableCell> 
            
            </TableRow>
          
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
