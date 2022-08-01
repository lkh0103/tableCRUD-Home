import React from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import capitalizeString from './CapitalizeString';


export default function Course() {

    const { id } = useParams<"id">();

    return (
        <div>
            <h2>
                Welcome to the {id!.split("-").map(capitalizeString).join(" ")} course!
            </h2>

            <p>This is a great course. You are gonna love it!</p>

            <Link to="/courses">See all courses</Link>
        </div>
    )
}
