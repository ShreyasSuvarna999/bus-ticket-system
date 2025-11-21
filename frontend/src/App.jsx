import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchBus from "./pages/SearchBus";
import SeatSelect from "./pages/SeatSelect";
import MyBookings from "./pages/MyBookings";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddBus from "./admin/AddBus";
import AllBuses from "./admin/AllBuses";
import AllBookings from "./admin/AllBookings";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ This appears on all pages */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchBus />} />
          <Route path="/seats/:busId" element={<SeatSelect />} />
          <Route path="/bookings" element={<MyBookings />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/addbus" element={<AddBus />} />
          <Route path="/admin/allbuses" element={<AllBuses />} />
          <Route path="/admin/allbookings" element={<AllBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
