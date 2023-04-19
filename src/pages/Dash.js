import  {React} from 'react';
import Dial from '../components/dash/dial.js';
import Card from '../components/dash/BasicCard.js';
import Temp from '../components/dash/temp.js';
import Barometer from '../components/dash/barometer.js';
import Grafik from '../components/dash/cizgiGrafik.js';
import Table from '../components/dash/table.js';
import  { useData } from '../context';

function Dash() {
  

  const{ data}= useData();

return (
  <div className='dash'>
    <div className="dials">
      <Card className='info' />
      <Dial id="dial1" value={data} title="Speed X" />
      <Temp id="dial7" value={data} title="Lowest Temp" />
      <Barometer id="dial9" value={data} title="Sıcaklık" />
    </div>
    <div className='grafik' >
      <div className='grafik2'>
        <Grafik />
      </div>

      <Table/>

    </div> 
  </div>

  )
}

export default Dash
