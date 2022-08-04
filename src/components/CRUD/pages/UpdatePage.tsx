import React from 'react'
import { useCRUD } from '../hooks/CRUDProvider'
import FormCRUD from '../partials/Form/Form'
import FormShema from '../partials/Form/FormSchema'
import ModalCRUD from '../partials/Modal'
import Toast from '../partials/Toast'

export default function UpdatePage(props: any) {

  const { data, updateData } = useCRUD();

  const updateDataUser = (dataInput: any) => {
    updateData(dataInput);
  };

  console.log(props.dataEdit);

  return (
    <div>
      {/* <Title /> */}
      <FormCRUD
        title={Object.keys(data[0])}
        data={props.dataEdit.rows}
        updateUser={updateDataUser}
      />
      {/* <Toast/> */}
    </div>
  );
}