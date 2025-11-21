import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchBus from "./pages/SearchBus";
import SeatSelect from "./pages/SeatSelect";
import MyBookings from "./pages/MyBookings";
import Auth from "./pages/Auth";
import Payment from "./pages/Payment.jsx";
import Ticket from "./pages/Ticket.jsx";
import BusResults from "./pages/BusResults.jsx";




// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddBus from "./admin/AddBus";
import AllBuses from "./admin/AllBuses";
import AllBookings from "./admin/AllBookings";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      {/* USER */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<SearchBus />} />
      <Route path="/seats/:busId" element={<SeatSelect />} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/ticket" element={<Ticket />} />
      <Route path="/results" element={<BusResults />} />



      {/* ADMIN */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/addbus" element={<AddBus />} />
      <Route path="/admin/allbuses" element={<AllBuses />} />
      <Route path="/admin/allbookings" element={<AllBookings />} />

      {/* PAYMENT PAGE */}
      <Route path="/payment" element={<Payment />} />
    </Routes>
  </Router>
);
