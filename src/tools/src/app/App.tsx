import React from 'react';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
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
