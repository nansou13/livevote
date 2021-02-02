import React, { useState } from 'react';
import QRCode from 'qrcode.react'
import logo from './qrcode.png';

const Menu = () => {
  const [displayed, setDisplayed] = useState(false)
  return (
    <>
      <div className="menu"> 
        <img src={logo} onClick={() => setDisplayed(true)}/>
      </div>
      {
        displayed && (
          <div className="overlay" onClick={()=>setDisplayed(false)}>
            <div className="qrcode">
              <QRCode size={250} value={window.location.href} />
            </div>
          </div>
        )
      }
    </>
  );
};

export default Menu;
