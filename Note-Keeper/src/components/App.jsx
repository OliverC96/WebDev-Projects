// Importing core functional components for each express route
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Header } from "./Partials/Header.jsx";
import { Footer } from "./Partials/Footer.jsx";
import { DarkModeProvider } from "./DarkModeContext.jsx";
import axios from "axios";

// Constructing, and extracting the highest-level component/module
export function App() {

    const [initialTheme, setInitialTheme] = useState(false);
    const [loading, setLoading] = useState(true);

    // Access the user's theme preferences from their previous browsing session (theme is light mode by default if no such session exists)
    async function retrieveInitialTheme() {
        try {
            return await axios.get("http://localhost:5000/api/user/theme");
        }
        catch (err) {
            console.log(err);
        }
    }

    // Retrieve the user's theme preferences upon initial mounting of the App component
    useEffect(() => {
        retrieveInitialTheme()
            .then((res) => {
                setInitialTheme(res.data);
                setLoading(false);
            });
    }, []);

    return (
        !loading &&  // Delay rendering of the application until the initial theme has been successfully retrieved
        <DarkModeProvider initial={initialTheme}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/home" element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </DarkModeProvider>
    );

}
