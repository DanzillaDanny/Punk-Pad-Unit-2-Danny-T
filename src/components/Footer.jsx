import React from 'react';
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
                  <Link to= "/About" className="about">About</Link>
               <div>Punk Pad 2025</div>
        </footer>
    );
};

export default Footer;
