import React from 'react'
import { Outlet } from 'react-router'

export default function Courses() {
    return (
        <div>
            <h2>courses</h2>
            <Outlet />
        </div>
    )
}
