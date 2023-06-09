import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './Contexts/userContext';
import { AlbumContextProvider } from './Contexts/albumContext';
import { InvitContextProvider } from './Contexts/invitContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <UserContextProvider>
            <AlbumContextProvider>
                <InvitContextProvider>
                    <App />
                </InvitContextProvider>
            </AlbumContextProvider>
        </UserContextProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
