import React, { useState } from "react"
import CRUD from "../components/CRUD"
import { Avatar, Image } from "antd"
import { Link } from "react-router-dom"
import { create, findId, list, remove, update } from "../libs/DataStore"

export function DemoCRUDPage() {
    const [dataEdit, setDataEdit] = useState<any>();
    // demo
    const fetchList = (params: any) => {
        // console.log('call', params)
        const data = list(params)
        return Promise.resolve(data)
    }

    const createApi = (params: any) => {
        const response = create(params)
        console.log(response);
        return Promise.resolve(response)
    }

    const updateApi = (params: any) => {
        const resUpdateApi = update(params)
        console.log(resUpdateApi)
        return Promise.resolve(resUpdateApi)
    }

    const removeApi = (id: string) => {
        const delApi = remove(id)
        console.log(delApi);
        return Promise.resolve(delApi)
    }

    const columns: any = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'username',
            dataIndex: 'username',
            width: '8%',
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
                return <Image src={value} />
            }
        },
        {
            title: 'Action',
            width: '8%',
            render: (value: any, index: number) => (
                <Link to={'/demo/update'}
                    onClick={() => handleEdit(value)}>Edit
                </Link>
            )
        },
    ];

    const handleEdit = (data: any) => {
        const response = findId(data.id);
        setDataEdit(response);
        return Promise.resolve(response);
    };

    

    const schema = null

    return (
        <CRUD
            name="demo"
            fetchList={fetchList}
            columns={columns}
            createAPI={createApi}
            updateUser={updateApi}
            removeUser={removeApi}
            dataEdit={dataEdit}
            formSchema={schema}
        />
    )
}