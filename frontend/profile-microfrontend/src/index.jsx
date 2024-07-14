import React from 'react'
import ReactDOM from 'react-dom/client'
import Profile from './components/Profile'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className="page__content">
            <main className="content">
                <Profile/>
            </main>
        </div>
    </React.StrictMode>
)