import React from 'react'
import "./home.css"
import HeroSection from '../HeroSection'
import { BrowserRouter as Router} from 'react-router-dom'

export default function() {
    return (
        <div>
            <Router>
            <HeroSection />
            </Router> 
        </div>
    )
}
