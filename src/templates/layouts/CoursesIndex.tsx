import React from 'react'
import { Link } from 'react-router-dom'

export default function CoursesIndex() {
    return (
        <div>
            <p>Please choose a course:</p>

            <nav>
                <ul>
                    <li>
                        <Link to="react-fundamentals">React Fundamentals</Link>
                    </li>
                    <li>
                        <Link to="advanced-react">Advanced React</Link>
                    </li>
                    <li>
                        <Link to="react-router">React Router</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
