import React, { useMemo } from 'react'
import { useRoutes } from 'react-router';
import { routes } from './Router1';

export default function Template1() {

    const element = useRoutes(routes)

    return (
        <div>
            {element}
        </div>
    )
}
