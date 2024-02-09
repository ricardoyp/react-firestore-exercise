import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css'

const queryClient = new QueryClient(); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
