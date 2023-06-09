import  {React, useEffect} from 'react';
import Dial from '../components/dash/dial.js';
import Card from '../components/dash/BasicCard.js';
import Temp from '../components/dash/temp.js';
import Barometer from '../components/dash/barometer.js';
import Grafik from '../components/dash/cizgiGrafik.js';
import Table from '../components/dash/table.js';
import  { useData } from '../Context/context';
import Map from '../components/Map.js';



function Dash() {

  const{data,selectedChart}= useData();

  
  const renderChart=()=>{
    switch (selectedChart) {
      case 1:
        return <Dial value={data} title="Sıcaklık" />;
      case 2:
        return <Temp value={data}/>;
      case 3:
        return <Barometer id="dial9" value={data} title="Sıcaklık" />;
      default:
        return null;
    };
  }; 



console.log(selectedChart);
return (
  <div className='home'>
  <div className='dashboard'>
    <div className="dials">
      <Card className='info' />
      {renderChart()}
      <Map className='leaflet-container'/>
    </div>
    <div className='grafik' >
      <div className='grafik2'>
        <Grafik />
      </div>

      <Table/>

    </div> 
  </div>
  </div>

  )
}

export default Dash
