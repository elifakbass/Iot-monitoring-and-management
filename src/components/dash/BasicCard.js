import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useData } from '../../Context/context';
import { useParams } from 'react-router-dom';



export default function BasicCard() {

    const {name,tip,setName,setTip,cihazlar }= useData();
    


  return (
    <Card sx={{ minWidth: 230 ,textAlign:'left', display:'absolute',boxShadow:'none'}} >
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          Cihaz
        </Typography>
        <Typography variant="h5" component="div" sx={{opacity:0.9,mb:1}}>
          {name}
        </Typography>
        <Typography component="div" >
          <Typography component="span" variant='body2' color='#009933'>
            Sensor Tipi:
          </Typography>
          <Typography component="span" sx={{ mb: 1.5 }} color="text.secondary">
            {tip}
          </Typography>
        </Typography>  
      </CardContent>
    </Card>
  );
  }
