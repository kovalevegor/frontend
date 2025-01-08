import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TradePage from "./pages/TradePage";
import BorrowPage from "./pages/BorrowPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import "./styles/App.css";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trade" element={<TradePage />} />
                <Route path="/borrow" element={<BorrowPage />} />
                <Route path="/admin-page" element={<AdminPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;
