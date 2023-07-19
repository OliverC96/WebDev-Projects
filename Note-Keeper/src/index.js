/********************************************************************************************
Project: Note Keeper React App
Author: Oliver Clennan
-> Allows authenticated users to dynamically add/remove notes to/from their collection
-> Makes use of modern ES6 and React.js features to provide an efficient, seamless experience
********************************************************************************************/

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from "./components/App.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);