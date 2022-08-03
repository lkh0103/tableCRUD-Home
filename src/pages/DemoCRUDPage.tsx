import React from "react"
import CRUD from "../components/CRUD"
import { Avatar, Image } from "antd"
import { Link } from "react-router-dom"
import { create, list } from "../libs/DataStore"

export function DemoCRUDPage() {
    // demo
    const fetchList = (params: any) => {
        // console.log('call', params)
        const data = list(params)
        return Promise.resolve(data)
    }

    const createApi = (params: any) => {
        const response = create(params)
        return Promise.resolve(response)
    }

    const columns: any = [
        {
            title: 'username',
            dataIndex: 'username',
            key: 'id'
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'id'
        },
        {
            title: 'registeredAt',
            dataIndex: 'registeredAt',
            key: 'age'
        },
        {
            title: 'avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (value: any, record: any) => {
                return <Avatar src={value} />
            }
        },
        {
            title: 'Action',
            dataIndex: 'name',
            key: 'name',
            // render: (value: any, record: any) => {
            //     return <Avatar src={value} />
            // }
            render: () => <Link to='/demo/update'>Edit</Link>
        }
    ]

    const schema = null

    return (
        <CRUD
            name="demo"
            fetchList={fetchList}
            createAPI={createApi}
            columns={columns}
            formSchema={schema}
        />
    )
}