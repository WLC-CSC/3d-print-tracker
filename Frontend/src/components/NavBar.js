import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
const NavBar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/AddPrint">Add Print</NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar;
