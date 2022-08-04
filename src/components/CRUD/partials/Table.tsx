import React from 'react'
import { Table } from 'antd';

export function CRUDTable(props: any) {
  return (
    <Table
      columns={props.columns}
      dataSource={props.dataSource}
      pagination={false}
      onChange={(e) => console.log(e)}
      rowKey='id'
    />
  )
}
