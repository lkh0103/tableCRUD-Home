import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCRUD } from '../hooks/CRUDProvider'
import CURDPagiantion from '../partials/Pagination'
import { CRUDTable } from '../partials/Table'

export default function ListPage() {
  const [dataTable, setDataTable] = useState<any>();
  const [page, setPage] = useState<any>();
  const { columns, loadData, pagination, params, data } = useCRUD();

  useEffect(loadData, [params]);

  // const onPageChange = (page: number) => {
  //   setParams({
  //     ...params,
  //     page,
  //   });
  // };

  const handlePage = (e: any) => {
    setPage(e);
  };
  const handleTablePage = () => {
    const dataPage = [];
    if (data) {
      for (let i = 0; i < pagination.total / pagination.totalPages; i++) {
        if (page == 1) {
          dataPage.push(data[i]);
        } else {
          dataPage.push(
            data[i + (page - 1) * (pagination.total / pagination.totalPages)]
          );
        }
      }
      setDataTable(dataPage);
    }
  };

  useEffect(handleTablePage, [page]);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchData = searchParams.get("search");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function getGitHubUser() {
      const response = await fetch(`https://api.github.com/users/${searchData}`, {
        signal: abortController.signal,
      });
      if (!abortController.signal.aborted) {
        const data = await response.json();
        setUserData(data);
      }
    }

    if (searchData) {
      getGitHubUser();
    }

    return () => {
      abortController.abort();
    };
  }, [searchData]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = formData.get("user") as string;
    if (!newUser) return;
    setSearchParams({ search: newUser });
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <input defaultValue={searchData ?? undefined} type="text" name="user" />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
      {userData && (
        <table className='container'>
          <thead>
            <tr>
              <th>Name Search</th>
              <th>Picture</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <h2>{userData.name}</h2>
              </td>
              <td>
                <img
                  style={{ borderRadius: "50%" }}
                  width={50}
                  height={50}
                  src={userData.avatar_url}
                  alt={userData.login} />
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <CRUDTable columns={columns} dataSource={dataTable} />
      {pagination.total > 0 && (
        <CURDPagiantion
          defaultCurrent={pagination.page}
          total={pagination.total}
          pageSize={pagination.total / pagination.totalPages}
          handlePage={handlePage}
        />
      )} <br /><br />
      <div><Link to="/demo/create">Create</Link></div>
    </div>
  )
}