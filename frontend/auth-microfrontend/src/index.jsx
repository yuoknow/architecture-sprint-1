import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth from './components/Auth'
import {BrowserRouter} from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="page__content">
                <Auth/>
            </div>
        </BrowserRouter>
    </React.StrictMode>
)