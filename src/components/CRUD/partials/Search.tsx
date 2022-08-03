import React from 'react'
import Search from 'antd/lib/input/Search'

export default function CRUDSearch(props: any) {
  return (
    <Search onSearch={(e) => props.onSearchUser(e)} />
  )
}