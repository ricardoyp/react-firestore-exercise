import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NextUIProvider>
            <App />
          </NextUIProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
