import React from 'react'
import ReactDOM from 'react-dom/client'
import Places from './components/Places'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className="page__content">
            <main className="content">
                <Places/>
            </main>
        </div>
    </React.StrictMode>
)