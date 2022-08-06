import React from 'react'
import { useCRUD } from '../hooks/CRUDProvider'
import FormCRUD from '../partials/Form/Form'
import FormShema from '../partials/Form/FormSchema'
import ModalCRUD from '../partials/Modal'
import Toast from '../partials/Toast'

export default function UpdatePage(props: any) {

  const { data, updateData, deleteData } = useCRUD();

  const updateDataUser = (dataInput: any) => {
    updateData(dataInput);
  };
  // console.log(props.dataEdit);

  const getReturnDeleteAPI = (id: string) => {
    deleteData(id)
  }

  return (
    <div>
      {props.schemaForm ? (
        <FormShema propsFormSchema={props.schemaForm} />
      ) : (
        <FormCRUD
          data={props.dataEdit.rows}
          title={Object.keys(data[0])}
          updateUser={updateDataUser}
          delUser={getReturnDeleteAPI}
        />
      )}
    </div>
  );
}