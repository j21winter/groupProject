import React from 'react';

export default function PremierLeagueStanding() {
    return (
        <div>
            <div className="text-center">
                <h5 style={{ 
                    display: 'inline-block', 
                    padding: '8px 15px', 
                    borderRadius: '5px', 
                    cursor: 'pointer', 
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#02FF85', 
                }}
                onMouseOver={(e) => e.currentTarget.style.border = '1px solid #000'}
                onMouseOut={(e) => e.currentTarget.style.border = '1px solid transparent'}
                >
                    Premier League standings
                </h5>
            </div>
            <div id="scoreaxis-widget-3148e" style={{ borderWidth: "1px", borderColor: "#00ff85", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%", backgroundColor: "#ffffff" }}> 
                <iframe id="Iframe" src="https://www.scoreaxis.com/widget/standings-widget/8?autoHeight=1&amp;removeBorders=0&amp;borderColor=%23000000&amp;font=1&amp;bodyBackground=%23ffffff&amp;textColor=%23000000&amp;groupNum=undefined&amp;inst=3148e" style={{ width: "100%", height: '540px', border: "none", transition: "all 300ms ease" }}></iframe>
            </div>
        </div>
    );
}
