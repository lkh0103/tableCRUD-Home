import React, { createContext, PropsWithChildren, useContext, useState, } from "react";
import { api, EMethod } from "../../../hooks/useRequest";
import { CRUDProps, FetchList } from "..";

interface CRUDContext {
    fetchList: FetchList;
    columns: any[];
    list: any;
    getData: any;
    title: any;
    pagination: any;
    loadData: any;
    params: any;
    data: any;
    createData: any;
    setParams: any;
    updateData: any;
}

export const CRUDContext = createContext<CRUDContext>({} as any);
export default function CRUDProvider(props: PropsWithChildren<CRUDProps>) {
    const [list, setList] = useState<any>();
    const [title, setTitle] = useState<any>();
    const [data, setData] = useState<any>();
    const [params, setParams] = useState<any>({
        page: 1,
        limit: 4,
    });
    const [pagination, setPagination] = useState<any>({});

    const fetchList = (params: any) => {
        if (typeof props.fetchList === "function") {
            return props.fetchList(params);
        }
        // TODO self handler
        return fetch(`/api/${props.name}`).then((result) => result.json())
    };

    const createData = (params: any) => {
        if (typeof props.createAPI === "function") {
            return props.createAPI(params);
        }
        // TODO self handler
        return fetch(`/api/${props.name}`, {
            method: 'POST',
            body: JSON.stringify(params)
        }).then((result) => result.json())
    }

    const updateData = (params: any) => {
        if (typeof props.updateUser === "function") {
            return props.updateUser(params);
        }
        // TODO self handler
        return fetch(`/api/${props.name}`, {
            method: 'POST',
            body: JSON.stringify(params)
        }).then((result) => result.json())
    }

    const loadData = () => {
        fetchList(params)
            .then((response) => {
                console.log("xx", response);
                const { rows, ...pagination } = response;
                setData(rows);
                setPagination(pagination);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getData = () => {
        api(EMethod.GET, "https://jsonplaceholder.typicode.com/posts").then(
            (res) => {
                setList(res.data);
            }
        );
    };

    const contextvalueCRUD = {
        list,
        title,
        getData,
        fetchList,
        loadData,
        pagination,
        data,
        params,
        columns: props.columns,
        setParams,
        createData,
        updateData,
    };

    return (
        <CRUDContext.Provider value={contextvalueCRUD}>
            {props.children}
        </CRUDContext.Provider>
    );
}

export const useCRUD = () => useContext(CRUDContext);