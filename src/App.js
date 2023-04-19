
import './App.css';
import Dashboard from './pages/Dash';

import {Routes, Route ,Link,NavLink} from "react-router-dom";
import Home from './pages/Home';
import Devices from './pages/Device';
import DashList from './pages/Dashboard';
import Layout from './pages/Layout';
import Page404 from './pages/Page404';
import Login from './pages/Auth/Login';
import AuthLayout from './pages/Auth/AuthLayout';

function App() {
  return (
    <>
    <Routes>

      <Route path='/' element={<Layout/>}>
          <Route index={true} element={<Home/>}/>
          <Route path='cihazlar' element={<Devices/>}/>
          <Route path='gostergeler' element={<DashList/>}/>
          <Route path='gostergeler/:cihazName' element={<Dashboard/>}/>   
       </Route>

      <Route path='/auth' element={<AuthLayout/>}>
        <Route path='login' element={<Login/>}/>
      </Route>
      <Route path='*' element={<Page404/>}/>
    </Routes>

    </>

  );
}

export default App;
