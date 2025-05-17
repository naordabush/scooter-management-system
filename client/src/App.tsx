import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Parking from "./pages/Parking";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => (
  <Router>
    <Routes>
      {/* Public login */}
      <Route path="/login" element={<Login />} />

      {/* Protected parking route */}
      <Route element={<PrivateRoute />}>
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route path="/parking" element={<Parking />} />
          {/* Redirect root to /parking */}
          <Route path="/" element={<Navigate to="/parking" replace />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default App;
