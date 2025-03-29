import React, { useEffect, useState } from "react";
import { db, ref, get, update, set } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // Import the CSS file

const employees = [
  "Izhar", "Prasad", "Vishakha", "Poojitha", "Neved",
  "Disha", "Saranya", "Subhi", "Jyoti", "Manish",
  "Vijay", "Kavya", "Shivani", "Samiksha", "Harika"
];

const ADMIN_PASSWORD = "admin123"; // Change this for security

const App = () => {
  const [tickets, setTickets] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await get(ref(db, "tickets"));
      if (snapshot.exists()) {
        setTickets(snapshot.val());
      } else {
        initializeTickets();
      }
    };
    fetchData();
  }, []);

  const initializeTickets = () => {
    const initialData = {};
    employees.forEach((emp) => (initialData[emp] = 0));
    set(ref(db, "tickets"), initialData);
    setTickets(initialData);
    toast.info("All tickets reset!");
    setShowLogin(false); // Hide login popup after reset
  };

  const assignTicket = async (employee) => {
    const newCount = (tickets[employee] || 0) + 1;
    await update(ref(db, "tickets"), { [employee]: newCount });
    setTickets((prev) => ({ ...prev, [employee]: newCount }));
    toast.success(`${employee} assigned a ticket!`);
  };

  const handleResetClick = () => {
    setShowLogin(true);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      initializeTickets();
      toast.success("Admin login successful! Tickets reset.");
    } else {
      toast.error("Incorrect password!");
    }
  };

  return (
    <div className="container">
      <h1>Employee Ticket Distribution</h1>

      <div className="employee-grid">
        {employees.map((employee) => (
          <div key={employee} className="employee-card">
            <h2>{employee}</h2>
            <div className="ticket-info">
              <span className="ticket-count">{tickets[employee] || 0}</span>
              <button className="assign-button" onClick={() => assignTicket(employee)}>➕</button>
            </div>
          </div>
        ))}
      </div>

      <button className="reset-button" onClick={handleResetClick}>Reset Tickets</button>

      {showLogin && (
        <div className="login-popup">
          <div className="login-box">
            <h3>Admin Login</h3>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
            <button className="login-button" onClick={handleLogin}>Submit</button>
            <button className="close-button" onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;