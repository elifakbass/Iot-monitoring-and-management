import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useData } from '../Context/context';
import ProgressBar from '../components/ProgressBar';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function BasicCard() {
    const {cihazlar}=useData();
    
  return (
    <Box sx={{ minWidth: 400,marginRight:10,marginTop:7}} >
    <Card variant="outlined" sx={{backgroundColor:'#f2f2f2',borderRadius:7, boxShadow:'0 2px 4px rgba(0, 0, 0, 0.2)',minHeight:250}}>
      <CardContent sx={{backgroundColor:'d9d9d9'}}>
      <Typography sx={{ fontSize: 20 , marginTop:1 ,marginLeft:1,marginRight:19}} align='left' color="text.secondary" gutterBottom>
          Bağlantılar
        </Typography>
        <Typography variant="h3" component="div" sx={{marginTop:2,marginBottom:5, fontWeight:'bold',fontSize:55}} color="text.secondary">
          {cihazlar.length }
        </Typography>
        <ProgressBar/>
        <Typography sx={{ fontSize: 14 ,marginTop:3}} color="text.secondary" gutterBottom>
          Aktif Cihaz Sayısı
        </Typography>
      </CardContent>
      
    </Card>
    </Box>
  );
}