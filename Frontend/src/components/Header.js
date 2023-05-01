import React from "react";
import "../Styles/header.css";
import banner from "../images/Makerspace.jpg";

function Header() {
    return (
        <div className="page-header">
            <div className="header-text">
                <img
                    src={banner}
                    alt="3D printed object"
                    height={100}
                    width={500}
                />
            </div>
        </div>
    );
}

export default Header;
