import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useData } from '../Context/context';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, Link } from '@mui/material';
import { useEffect,useState } from 'react';
import Modal from './Modal';
import { fetchDashs, fetchDevice } from '../api';
import { useAuth } from '../Context/AuthContext';



function createData(id,isim, tip,alarm_alt_sinir,alarm_ust_sinir) {
  return { id,isim, tip,alarm_alt_sinir,alarm_ust_sinir};
}



export default function TableCihaz(props) {
  const [hoveredRow, setHoveredRow] = useState(null);
    const {name,cihazlar} =useData();
    const {user}=useAuth();
    const [filteredRows, setFilteredRows] = useState([]);
    const [rows,setRows]=useState([]);
    
    const handleRowHover = (rowId) => {
      setHoveredRow(rowId);
      };

    useEffect(()=>{
      if(rows.length===cihazlar.length){
        setRows([]);
      }
      cihazlar.map((cihaz)=>{
        const row=createData(cihaz.id,cihaz.isim,cihaz.tip,cihaz.alarm_alt_sinir,cihaz.alarm_ust_sinir);
        setRows((current)=>[...current,row]);

      });
     

    },[cihazlar])
    
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
      
    }, [props.parametre,rows]);
     
 
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1200 ,marginLeft:"100px",marginTop:"60px",backgroundColor:'#f2f2f2'}} elevation={1} >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Cihaz İsmi</TableCell>
            <TableCell align="left">Cihaz Tipi</TableCell>
            <TableCell>Alarm Kuralları</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          { filteredRows.map((row) => (
            <TableRow
              key={row.isim}
              onMouseEnter={() => handleRowHover(row.id)}
              onMouseLeave={() => handleRowHover(null)}
             
              sx={{ '&:last-child td, &:last-child th': { border: 0} , marginTop:"5px",borderBottom: '1px solid #ccc'
             , backgroundColor: hoveredRow === row.id ? '#b3d1ff' : '#f2f2f2',
          
            }}
           
          
            >
              <TableCell component="th" scope="row"  >
                {row.isim}
              </TableCell>
              <TableCell align="left"  >{row.tip}</TableCell>
              <TableCell align='left' >{`${row.alarm_ust_sinir} > veya ${row.alarm_alt_sinir} <`} <Modal id={row.id} isim={row.isim} /></TableCell>
              <TableCell align="right" sx={{width:'30px'}} elevation={0} >{<Link href={`gostergeler/${row.isim}` } color="#595959"><DashboardIcon/></Link>}</TableCell> 
            
            </TableRow>
          
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
