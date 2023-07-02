// Importing core functional components for each express route
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Header } from "./Partials/Header.jsx";
import { Footer } from "./Partials/Footer.jsx";

// Constructing, and extracting the highest-level component/module
export function App() {

    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/home" element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );

}
