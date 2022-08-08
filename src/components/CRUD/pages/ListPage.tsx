import { Button } from 'antd'
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCRUD } from '../hooks/CRUDProvider'
import CURDPagiantion from '../partials/Pagination'
import CRUDSearch from '../partials/Search'
import { CRUDTable } from '../partials/Table'
import Title from '../partials/Title'

export default function ListPage() {
  const { columns, loadData, pagination, params, setParams, data } = useCRUD();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(loadData, [params]);

  const onPageChange = (page: number) => {
    setSearchParams({ searchPage: String(page) })
    setParams({
      ...params,
      page,
    });
  };

  const onSearch = (search: string, page: number) => {
    setSearchParams({ searchUser: search })
    setParams({
      ...params,
      searchParams,
      page,
      search
    });
  };

  return (
    <div>
      <Title /><br />
      <Button style={{ float: 'right' }}>
        <Link to="/demo/create">Create User</Link>
      </Button><br /><br /><br />
      <CRUDSearch onSearchUser={onSearch} />
      <CRUDTable columns={columns} dataSource={data} />
      {pagination.total > 0 && (
        <CURDPagiantion
          defaultCurrent={pagination.page}
          total={pagination.total}
          pageSize={pagination.total / pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}