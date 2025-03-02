import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FlightsContextProvider } from './context/FlightsContext.jsx'
import { FlightSelectionProvider } from './context/FlightSelectContext.jsx'

import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FlightsContextProvider>
          {/* <BookingProvider> */}
          <FlightSelectionProvider>
            <App />
          </FlightSelectionProvider>
          {/* </BookingProvider> */}
        </FlightsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
