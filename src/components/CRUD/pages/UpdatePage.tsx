import React from 'react'
import { useCRUD } from '../hooks/CRUDProvider'
import FormCRUD from '../partials/Form/Form'

export default function UpdatePage(value: any) {

  const { data, title } = useCRUD();

  return (
    <div>
      <FormCRUD
        data={data}
        title={title}
      />
    </div>
  )
}