
import React, { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import NormalSubscritption from './NormalSubscritption';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { fetchAdminData } from "../../../helper/helper";
import Premium from "./Premium";
function home() {
  const navigate = useNavigate();

  // const [logout,setLogout]=useState(false)
  const token = localStorage.getItem("token")
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);


  // const showLogout=()=>{
  //   setLogout(true)
  // }
  // const logoutAction=()=>{
  //   localStorage.removeItem('token')
  //   navigate('/')
  // }
  // const cancelLogout = () => {
  //   setLogout(false);
  // };


  return (
    <>
     <div className="container-fluid " style={{ height: "100vh",backgroundColor:'#36454F',overflow:'hidden' }}>
        <div className=" row  ">
        <Navbar />
          <div className="col-2 p-4 text-white">
            <Sidebar />
          </div>
<div className="col-10 " style={{backgroundColor:'#D3D3D3',height:'90vh'}}>
  {logout ?
  (<div className="popup">
      <p>Are you sure you want to logout?</p>
      <button className="btn btn-danger w-25" onClick={logoutAction}>OK</button><br/>
      <button className="btn btn-warning mt-3 w-25"  onClick={cancelLogout}>Cancel</button>
    </div>)
     :
    (
  <Box className='ms-5' sx={{ width: '90%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Normal" />
          <Tab value="two" label="Premium" />
        </Tabs>
      </Box>)}
      {!logout && value === 'one' && (
        <div className="justify-center m-5">
          <NormalSubscritption />
        </div>
      )}
      {!logout &&  value === 'two' && (
        <div className="justify-center m-5">
          <Premium/>
        </div>
      )}




</div>
        </div>
  
      </div>
    </>
  );
}

export default home;