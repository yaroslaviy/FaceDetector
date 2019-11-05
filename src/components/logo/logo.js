import React from 'react';
import Tilt from 'react-tilt';
import 'tachyons';
import './logo.css';
import logo from './face-detection.png';

const Logo = ()=>{
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> <img  style ={{paddingTop: '10px'}} src={logo} alt='Logo'></img> </div>
            </Tilt>
        </div>
    );
}

export default Logo;