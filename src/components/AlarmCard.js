import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useData } from '../Context/context';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function BasicCard() {
    const {alarmCount}=useData();
    
  return (
    <Box sx={{ minWidth: 400,marginRight:19,marginLeft:20,marginTop:7}} >
    <Card variant="outlined" sx={{backgroundColor:'#f2f2f2',borderRadius:7, boxShadow:'0 2px 4px rgba(0, 0, 0, 0.2)',minHeight:250}}>
        <CardContent sx={{backgroundColor:'d9d9d9'}}>
        <Box component="div" sx={{display:'flex'}}>
      <Typography  sx={{ fontSize: 20 , marginTop:1 ,marginLeft:1,marginRight:19}} align='left' color="text.secondary" gutterBottom>
          Alarm Sayısı
        </Typography>
        <CrisisAlertIcon sx={{color:"red",fontSize:50,marginTop:2}} />
        </Box>
        <Box component="div" sx={{display:'flex',marginBottom:3}}>
      <Typography sx={{fontSize:55,fontWeight:600,color:'#595959',marginTop:1,marginLeft:5}}>
        {alarmCount}
      </Typography>
      <ArrowDownwardIcon sx={{color:'green',marginTop:6,marginLeft:2}}/>
      <Typography sx={{marginTop:6,marginLeft:1,opacity:0.6}}>
        20% Önceki güne kıyasla
      </Typography>
      </Box>
        <Typography sx={{ fontSize: 14 ,marginLeft:1}} align='left' color="text.secondary" gutterBottom>
          Günlük Toplam Etkin Alarm Sayısı
        </Typography>
      </CardContent>
    </Card>
    </Box>
  );
}
