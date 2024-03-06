
import React, { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import NormalSubscritption from './NormalSubscritption';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { fetchAdminData } from "../../../helper/helper";
import Premium from "./Premium";
function home() {
  const navigate = useNavigate();
  const [adminData,setAdminData]=useState()
  const [logout,setLogout]=useState(false)
  const token = localStorage.getItem("token")
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminData = await fetchAdminData();
        setAdminData(adminData);

      } catch (error) {
        console.error("Error in UserProfile:", error);
      }
    };
    fetchData();
  }, [logout]);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const showAdministration=()=>{
    setLogout(false)
    navigate('/administration')

  }
  const showUserManagement=()=>{
    setLogout(false)
    navigate('/usermanagement')

  }
  const showNotification=()=>{
setLogout(false)
    navigate('/notification')

  }
  const showSubscription=()=>{
    setLogout(false)
    navigate('/subscription')
  }
  const showLogout=()=>{
    setLogout(true)
  }
  const logoutAction=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  const cancelLogout = () => {
    setLogout(false);
  };

  const showDashboard=()=>{
    setLogout(false)
    navigate('/dashboard')
  }


  return (
    <>
     <div className="container-fluid " style={{ height: "100vh",backgroundColor:'#36454F',overflow:'hidden' }}>
        <div className=" row  ">
        <div className="col-2  ps-5 pt-3">
      <img src="src\assets\logo.png" alt="" style={{ width: '5vw' }} />
    </div>
    <div className="col-10 d-flex justify-content-end p-3">
    <motion.button
  whileHover={{ scale: 1.1, backgroundColor: '#2c3e50', color: '#ecf0f1' }}
  transition={{ duration: 0.3 }}
  className="p-2 link rounded"
  onClick={showLogout}
>
  Logout
</motion.button>      <span className="ms-3 me-3 mt-1 text-light"> {adminData && adminData.firstName} {" "}{adminData && adminData.lastName} </span>
    </div>
        <div
  className="col-2 p-4 text-white "
>


  <motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2  link" onClick={showDashboard}>
  Admin dashboard
</motion.p>
             
        
  <motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2 mt-4 link" onClick={showAdministration}>
  Administration
</motion.p>

<motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2 link" onClick={showUserManagement}>
  User management
</motion.p>

<motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2 link"  onClick={showNotification}>
  Push notification
</motion.p>

<motion.p whileHover={{ scale: 1.1, backgroundColor: '#e4e5f1', color: '#36454F', borderRadius: '100px', x: 12 }} transition={{ duration: 0.3 }} className="p-2 link"  onClick={showSubscription}>
  Subscription
</motion.p>


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
