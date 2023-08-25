import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import HostRoutes from './routes/HostRoutes';
import AdminRoutes from './routes/AdminRoutes'
function App() {
  return (

    <div className='App h-[100vh]'>
      <Router>
        <Routes>
          <Route element={<UserRoutes />} path='/*' />
          <Route element={<HostRoutes />} path='/host/*' />
          <Route element={<AdminRoutes />} path='/admin/*' />

        </Routes>
        <ToastContainer />
      </Router>
    </div>

  
  );
}

export default App;
