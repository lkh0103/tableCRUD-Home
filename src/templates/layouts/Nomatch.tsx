import React from 'react'
import { Link } from 'react-router-dom'

export default function Nomatch() {
    return (
        <div>
            <h2>It looks like you are lost...</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    )
}
