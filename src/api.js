
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';


export const fetchData = async ()=>{
  try{
      const response = await axios.get('http://localhost:9000/api/product');
      return response.data;
  }
  catch(error){}
 }

export const fetchDeviceProperties= async ()=>{
  try{
      const response =await axios.get('http://localhost:1337/devices');
      return response.data;
  }catch(e){}
}
 
export const fetchLogin=async (username,password)=>{

  try{
    
    let item={username,password};
    let result = await fetch('http://localhost:9000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    result=await result.json();
    localStorage.setItem("user-info",JSON.stringify(result));
  
  }catch(e){
    console.log(e);
  }
  }

export const fetchDevice=async(id)=>{
  const response= await axios.get(`http://localhost:9000/api/musteri_cihaz/${id}`);
  return response.data;
}

export const updateAlarm=async(cihazId,newKural)=>{
  const response=await axios.put(`http://localhost:9000/api/alarm/${cihazId}`,newKural);
  return response.data;
}

export const fetchDashs=async(cihazId)=>{
  const response=await axios.get(`http://localhost:9000/api/dashboard/${cihazId}`);
  return response.data;

}

 
