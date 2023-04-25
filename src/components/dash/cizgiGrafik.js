import  {React} from 'react';
import {VictoryLine,VictoryChart,VictoryTheme, VictoryScatter,VictoryVoronoiContainer,VictoryTooltip} from 'victory';

import { useData } from '../../Context/context';
function CizgiGrafik() {

  const {veri} =useData();

  if(veri.length>10){
    veri.splice(0,1);
  }
  
console.log(veri);
  return (
    <div>
      
    <VictoryChart height={290} width={550} maxDomain={{x:10,y:100}} domainPadding={120} 
> 

  <VictoryLine 
  animate={{duration:1000}}
    style={{
      data: { stroke: "#336699",strokeWidth:5 },
      parent: { border: "2px solid #ccc"},
   //   labels:{ fontSize:12 ,fill: ({ veri })=> veri===0 ? "#FFF" : "#336699",fontWeight:0.2,strokeWidth:0.5}
    
    }}
  
    data={
      veri
    }
    
  />
  <VictoryScatter data={veri}
            size={5}
            style={{ data: { fill: "#336699" } }}
          />

  
</VictoryChart>
  
    </div>
  )
}


export default CizgiGrafik
