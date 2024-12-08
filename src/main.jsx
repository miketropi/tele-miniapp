import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx';
import Games from './pages/Games.jsx';
import WebApp from '@twa-dev/sdk';
import { AppContextProvider } from './context/AppContext.jsx';

WebApp.ready();

createRoot(document.getElementById('root')).render(
  <AppContextProvider WebApp={ WebApp }>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/play" element={<Games/>} /> 
        </Routes>
      </BrowserRouter> 
    </StrictMode>
  </AppContextProvider>,
)
