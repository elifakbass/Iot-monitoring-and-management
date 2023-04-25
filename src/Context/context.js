import  React,{ useContext, useEffect} from 'react'
import { fetchDeviceProperties ,fetchData, fetchDevice, fetchDashs} from '../api';
import { useState } from 'react';
import { w3cwebsocket as W3CWebSocket, client } from "websocket";
import mqtt,{setPayload} from "mqtt/dist/mqtt";
import { useAuth } from './AuthContext';
import { useLocation, useParams ,useRouteMatch} from 'react-router-dom';


const DataContext=React.createContext();
const websocketUrl = "mqtt://host.docker.internal:9001";
var options={
  username:"elif",
  password:"123456"
};


function createData(zaman, cihazIsmi, tip, deger) {
  return { zaman, cihazIsmi, tip, deger};
}

function urlSplit(location,setName){
  location=location.slice(1);
  location=location.split("/");
  if(location.length===2 && location[0]==='gostergeler'){
    localStorage.setItem("cihaz-name",location[1]);
    setName(location[1]);

  }
  return false;
}


export function DataProvider({children}) {
  const [data,setData]=useState(null);
  const [name,setName]=useState(localStorage.getItem("cihaz-name") || "");
  const [veri,setVeri]=useState([0]);
  const [alarm,setAlarm]=useState([]);
  const [cihazlar,setCihazlar]=useState([]);
  const [gostergeler,setGostergeler]=useState([]);
  const [tip,setTip]=useState("default");

  const {user}=useAuth();
  const [low,setLow]=useState(localStorage.getItem("low-alarm") || false);
  const [big,setBig]=useState(localStorage.getItem("max-alarm") || false);

  const location=useLocation();

  const client = mqtt.connect(websocketUrl,options);

  useEffect(()=>{

    const getGostergeler = async () => {
      const allGostergeler = [];
      for (let i = 0; i < cihazlar.length; i++) {
        const cihaz = cihazlar[i];
        const dash = await fetchDashs(cihaz.id);
        allGostergeler.push(dash);

        
        if(cihaz.isim===name){
          localStorage.setItem("low-alarm",cihaz.alarm_alt_sinir);
          localStorage.setItem("max-alarm",cihaz.alarm_ust_sinir);
          setLow(cihaz.alarm_alt_sinir);
          setBig(cihaz.alarm_ust_sinir);

        }
        

      }
      setGostergeler(allGostergeler);

    };
    getGostergeler();


  },[cihazlar])

  useEffect(()=>{
    urlSplit(location.pathname,setName);

  },[location.pathname])

  


  useEffect(()=>{
    const sonuc=urlSplit(location.pathname,setName);

 
      fetchDevice(user.id).then(devices=>{
        setCihazlar(devices);
        
      });

       
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
      console.log(big);

      
      const payload = { topic,message: message.toString() };
      const mesaj=JSON.parse(payload.message);
      const verii=mesaj[localStorage.getItem("cihaz-name")][0].values.temperature;


          if(verii>localStorage.getItem("low-alarm") && verii<localStorage.getItem("max-alarm")){
            setData(verii);
            setVeri((current)=>[...current,verii]);
          }
      
          else{
            const unixTime=mesaj[localStorage.getItem("cihaz-name")][0].ts;
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
    setName,
    data,
    veri,
    alarm,
    setAlarm,
    cihazlar,
    setCihazlar,
    tip,
    setTip, 
    gostergeler,
    setGostergeler,



  }
  return(
        <DataContext.Provider value={deviceData}>
            {children}
        </DataContext.Provider>
    )

  }
export const useData = ()=> useContext(DataContext);




