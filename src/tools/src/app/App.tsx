import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { Router } from "./Router";
import { MDBContainer } from "mdb-react-ui-kit";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <MDBContainer fluid className="mt-3">
                <Router />
            </MDBContainer>
        </BrowserRouter>
    );
}
