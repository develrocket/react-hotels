import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider, Link} from "react-router-dom";

import Home from "./home/Home";
import HotelDetail, {loader as hotelLoader} from "./hotel-detail/HotelDetail";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: 'hotel/:hotelId',
        element: <HotelDetail />,
        loader: hotelLoader
    }
])


function App() {

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="text-3xl font-bold">
                    Hotel List
                </h1>
            </header>

            <RouterProvider router={router} />
        </div>
    );
}

export default App;
