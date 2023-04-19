
import axios from 'axios';

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
 

 
