import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/resister'>Resister</Link>
            <Link to='/register-rbs'>Resister RBS</Link>
            <Link to='/register-bs'>Resister BS</Link>
        </nav>
    );
};

export default Header;