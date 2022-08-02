import React from 'react'
import { useCRUD } from '../hooks/CRUDProvider'
import FormCRUD from '../partials/Form/Form'
import ModalCRUD from '../partials/Modal'
import Title from '../partials/Title'
import Toast from '../partials/Toast'

export default function UpdatePage(value: any) {

  const { data, title } = useCRUD();

  return (
    <div>
      <Title />
      <FormCRUD
        data={data} />
      <Toast />
      <ModalCRUD />
    </div>
  )
}