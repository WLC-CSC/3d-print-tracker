import React from "react";
import "../Styles/header.css";
import banner from "../images/WLC_Logo.jpg";

function Header() {
    return (
        <div className="page-header">
            <div className="header-image">
                <img
                    src={banner}
                    alt="3D printed object"
                    height={100}
                    width={100}
                />
            </div>
            <div className="header-text">
                <h1>WLC 3D Print Tracker</h1>
            </div>
        </div>
    );
}

export default Header;
