import React from "react";
import "./About.css";

const About = () => {
    return(
<main className="containter panel-wrap">
    <section className="panel about-panel">
        <h1 className="about-title">About Punk Pad!</h1>
        <p className="about-intro">Punk Pad is a virtual chord progression generator to help artists that love punk rock create songs fast.</p>
        <h2 className="about-subtitle">Built for Speed, Attitude, and Energy, and created to help punk musicians find their sound!</h2>
        <h2 className="about-subtitle">Key Features</h2>
        <table className="about-table">
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Instant Inspiration</td>
                    <td>Generate from a database filled with tons of Punk and Pop Punk progressions!</td>
                </tr>
                <tr>    
                    <td>Genre-Specific Templates</td> 
                    <td>Select from your favorite punk and pop-punk sub-genres!</td>
                </tr>
                <tr>    
                    <td>BPM Control</td>
                    <td>Quickly set your desired tempo!</td>
                </tr>
                <tr>    
                    <td>Key Selection</td>
                    <td>Choose any key that fits within your vocal range or preferred sound!</td>
                </tr>    
                <tr>
                    <td>Add Favorites</td>
                    <td>Add your favorite progressions to your user account to reference later!</td>
                </tr>    
            </tbody>
        </table>    
    </section>
    </main>
    );
};

export default About;