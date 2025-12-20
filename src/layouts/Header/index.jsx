import React from 'react';
import { FaHeart } from 'react-icons/fa'; 
import { COUPLE_NAMES } from '../../utils/mock_data';
import './index.css';

function Header() {
  const { BRIDE, GROOM } = COUPLE_NAMES;

  return (
    <header className="header">
        <FaHeart className="icon"/>
        <h1 className="header-title">
            {BRIDE} & {GROOM}
        </h1>
    </header>
  );
}

export default Header;