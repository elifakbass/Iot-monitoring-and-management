import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useData } from '../Context/context';

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
    <Card sx={{ minWidth: 350, marginLeft: 30,marginTop :10,display:'inline-block', minHeight:230}} color='d9d9d9'>
      <CardContent sx={{backgroundColor:'d9d9d9'}}>
      <Typography variant="body2" sx={{textAlign:'left',marginLeft:1, fontSize:17, letterSpacing:1,fontWeight:500}} color="text.secondary">
          Alarm Sayısı
        </Typography>
        <Typography variant="h3" component="div" sx={{marginTop:3,marginBottom:2, fontWeight:'bold'}} color="text.secondary">
          {alarmCount }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Günlük Toplam Etkin Alarm Sayısı
        </Typography>
      </CardContent>
    </Card>
  );
}
