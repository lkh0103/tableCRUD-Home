import React from "react"
import CRUD from "../components/CRUD"
import { listData } from "../components/CRUD/mock-data"
import { Avatar, Image } from "antd"
import { Link } from "react-router-dom"
import { create, list } from "../libs/DataStore"

export function DemoCRUDPage() {
    // demo
    const fetchList = (params: any) => {
        console.log('call', params)
        const data = list(params)
        return Promise.resolve(data)
    }

    const createApi = (params: any) => {
        const response = create(params)
        return Promise.resolve(response)
    }
    //
    //

    const columns: any = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'id'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone'
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location'
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