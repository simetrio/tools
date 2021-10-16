import { useState } from "react";
import { AllRoutes } from "./Routes";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink
  } from "mdb-react-ui-kit";

export const Header: React.FC = () => {
    const [showBasic, setShowBasic] = useState(false);

    return (
        <>
            <MDBNavbar expand="lg" dark bgColor="primary">
                <MDBContainer fluid>
                    <MDBNavbarBrand href="/">
                        <MDBIcon className="mx-2 fa-1-5x" icon="envelope" />
                        Olrix Tools
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag="a" className="nav-link">
                                        Choose tools
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        {AllRoutes.map(x => (
                                            <MDBDropdownItem key={x.url}>
                                                <MDBDropdownLink href={`/tools/${x.url}/`}>{x.name}</MDBDropdownLink>
                                            </MDBDropdownItem>
                                        ))}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    )
}