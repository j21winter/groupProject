import React from 'react';
import FootballWidget from '../../LiveApi/FootballWidget';
import { useNavigate } from 'react-router-dom';
// import '../../App.css';
import welcomingHeader from '../../assets/Black White Minimalist Animation Logo Video  (1).gif'

export default function Homepage() {
const Navigate = useNavigate();

return (
    <div> 
        <img src={welcomingHeader} alt="welcoming-header" style={{ 
            width: '100vw',  
            height: '35vw',
            display: 'block', 
            objectFit: 'cover'}} /> 
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <button className="btn btn-primary mr-2" onClick={() => Navigate('/login')}>
            Login
            </button>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%', 
            flexDirection: 'column' 
        }}>
        <FootballWidget />
        </div>
    </div>
);
}
