import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from './assets/Routes/router';
function App() {
  const adminpages =[{type:"admin", url:"/admin/about"}, {type:"admin", url:"/admin/car"}]
 
  useEffect(()=>{

  },[])
  return (
    <div>
<RouterProvider router={router}/>
<ToastContainer/>
    </div>
  );
}

export default App;