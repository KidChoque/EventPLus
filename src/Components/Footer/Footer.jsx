import React from 'react';
import "./Footer.css"
const Footer = ({textRigths="Artuzzette Lindoooooooooo"}) => {
    return (
        <footer className='footer-page'>
           <p className='footer-page-rights'>{textRigths}</p>
        </footer>
        
    );
};

export default Footer;