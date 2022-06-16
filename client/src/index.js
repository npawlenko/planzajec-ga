import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './home/Home';
import Create from './create/Create';


const container = document.getElementById("app");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />

                <Route exact path="/create" element={<Create />} />

                <Route component={<Home />} />
            </Routes>
        </Router>
    </React.StrictMode>
);