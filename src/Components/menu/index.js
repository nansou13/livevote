import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import logo from './qrcode.png';

const Menu = () => {
  const [displayed, setDisplayed] = useState(false);
  return (
    <>
      <div className="menu">
        <img src={logo} alt="display QR code" onClick={() => setDisplayed(true)} />
      </div>
      {displayed && (
        <div className="overlay" onClick={() => setDisplayed(false)}>
          <div className="qrcode">
            <QRCode size={250} value={window.location.href.replace('/admin', '')} />
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
