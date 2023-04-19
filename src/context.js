import  React,{ useContext, useEffect} from 'react'
import { fetchDeviceProperties ,fetchData} from './api';
import { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import mqtt,{setPayload} from "mqtt/dist/mqtt";

const DataContext=React.createContext();
const websocketUrl = "mqtt://host.docker.internal:9001";
var options={
  username:"elif",
  password:"123456"
};


function createData(zaman, cihazIsmi, tip, deger) {
  return { zaman, cihazIsmi, tip, deger};
}

export function DataProvider({children}) {
  const [data,setData]=useState(null);
  const [name,setName]=useState("SN-001");
  const [tip,setTip]=useState("default");
  const [veri,setVeri]=useState([0]);
  const [alarm,setAlarm]=useState([]);
  const [time,setTime]=useState();  
  const [devices,setDevices]=useState([]);

  useEffect(()=>{

      const client = mqtt.connect(websocketUrl,options);
      client.stream.on("error", (err) => {
        console.log("error");
        client.end();
      });
      client.on('connect', function () {
        console.log('Connected');
      });
     client.subscribe("v1/gateway/telemetry",1,(error)=>{
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
      });

      client.on('message',(topic,message) => {
        const payload = { topic,message: message.toString() };
        const mesaj=JSON.parse(payload.message);
        const verii=mesaj[name][0].values.temperature;
        if(verii>0 && verii<100){
          setData(verii);
          setVeri((current)=>[...current,verii]);
        }
        
        else{
          const unixTime=mesaj[name][0].ts;
          const date = new Date(unixTime);
          const datee= date.toLocaleDateString() +" "+ date.toLocaleTimeString()
          const newRow = createData(datee,name,"Yüksek Sıcaklık",verii);
          setAlarm((current)=>[...current,newRow]);
            
        }

      });

/*
  fetchDeviceProperties().then(veri=>{
    veri.entities.map((item)=>{
      setName(item.properties.name);
      return setId(item.properties.id);
    })
  });

  fetchData().then(veri=>{
    veri.map((item)=>{
      setTime((current)=>[...current,item.updated_at.slice(0,10)]);
      return setVeri((current)=>[...current,item.deger]);
    });
  }); */

},[]);

  const deviceData={
    name,
    tip,
    data,
    veri,
    alarm,
    setAlarm,
    devices


  }
  return(
        <DataContext.Provider value={deviceData}>
            {children}
        </DataContext.Provider>
    )

  }
export const useData = ()=> useContext(DataContext);




