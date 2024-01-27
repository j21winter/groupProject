import React from 'react';
import FootballWidget from '../../LiveApi/FootballWidget';
import { useNavigate } from 'react-router-dom';
// import '../../App.css';
import welcomingHeader from '../../assets/Black White Minimalist Animation Logo Video  (1).gif'

export default function Homepage() {
  const Navigate = useNavigate();

  return (
    <div> {/* Full height of the viewport */}
      <img 
  src={welcomingHeader} 
  alt="welcoming-header" 
  style={{ 
    width: '100vw',   // 100% of the viewport width
    height: '35vw',  // 100% of the viewport height
    display: 'block', // Display as a block-level element
    objectFit: 'cover'
  }} 
/> {/* Use the imported image here */}
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <button className="btn btn-primary mr-2" onClick={() => Navigate('/login')}>
          Login
        </button>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Full height of the container
        flexDirection: 'column' // Stack items vertically
      }}>
        <FootballWidget />
      </div>
    </div>
  );
}
