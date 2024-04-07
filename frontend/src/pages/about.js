import React from 'react'
import {Link} from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h3 className='aboutHeading'>Transform your goals into achievements, one rep at a time.</h3>

            <p className="aboutText">
                At Workout Buddy, we believe that everyone deserves the opportunity to lead a healthy and active lifestyle. Whether you're a seasoned athlete, a fitness enthusiast, or just beginning your journey towards better health, our platform is designed to support and empower you every step of the way.
            </p>

            <div className="aboutButtons">
                <div className='aboutLinks'>
                    <strong >
                        <p>Alredy a Member?</p> 
                    </strong>
                    <Link to="/login" className='notLoggedIn'>Login</Link>
                </div>
                <div className='aboutLinks'>
                    <strong >
                        <p>Not a Member?</p> 
                    </strong>
                    <Link to="/signup" className='notLoggedIn'>Sign Up</Link>
                </div>
            </div>
            <div className='aboutFuture'>
                <h3>Future Additions</h3>
                <ul>
                    <li><strong>Goal Setting to Self-Motivate:</strong> Implement a feature allowing users to set fitness goals, track progress, and receive motivational reminders.</li>
                    <li><strong>Workout Advice:</strong> Integrate workout advice section with exercise tutorials, training plans, and nutritional guidance.</li>
                    <li><strong>Inter-User Competition:</strong> Create inter-user competition feature including challenges, leaderboards, and social sharing for motivation.</li>
                </ul>
            </div>

        </div>
    )
}

export default About
