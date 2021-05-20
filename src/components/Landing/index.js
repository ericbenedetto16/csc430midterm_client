import React from 'react';
import background from './Students.png';
import logo from '../SchoolLogo.png';
export const Landing = () => {
    return (
        <div>
        <div
            style={{
                display: 'flex',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                letterspacing: '6px',
            }}
        >
            
            <h1>
            Welcome to the School System
                </h1>  
                <div >
                <img src={background} alt="Students" />
            
                    </div>  
                
        </div>
        <div style={{position:'absolute',bottom:'0px',left:'0px'}}>
            <img src={logo} alt='logo'></img>

        </div>
        </div>
    );
};
