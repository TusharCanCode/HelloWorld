import React from 'react'
import Leftbar from '../../components/leftbar/Leftbar'
import Navbar from '../../components/navbar/Navbar'
import Results from '../../components/results/Results'
import './Search.css'

export default function Search() {
    return (
        <>
            <Navbar />
            <div className="homeContainer">
                <div className="Leftbar">
                    <Leftbar />
                </div>
                <div className="Results">
                    <Results />
                </div>
            </div>
        </>
    )
}