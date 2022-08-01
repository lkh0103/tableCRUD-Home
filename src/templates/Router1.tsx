import React from 'react'
import { RouteObject } from 'react-router';
import { DemoCRUDPage } from '../pages/DemoCRUDPage';
import { UserCRUDPage } from '../pages/UserCRUDPage'
import Home from './layouts/Home';
import Layout from './layouts/Layout';
import Nomatch from './layouts/Nomatch';

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: '/demo',
                children: [
                    { index: true, element: <DemoCRUDPage /> },
                    { path: ':id', element: <DemoCRUDPage /> }
                ]
            },
            {
                path: '/user',
                children: [
                    { index: true, element: <UserCRUDPage /> },
                    { path: ':id', element: <UserCRUDPage /> }
                ]
            },
            { path: "*", element: <Nomatch /> },
        ],
    },
];


      // { index: true, element: <Home /> },
            // {
            //     path: "/courses",
            //     element: <Courses />,
            //     children: [
            //         { index: true, element: <CoursesIndex /> },
            //         { path: "/courses/:id", element: <Course /> },
            //     ],
            // },