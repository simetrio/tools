import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Header } from './Header';
import { Router } from './Router';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}
