import React from "react";
import { useCRUD } from "../hooks/CRUDProvider";
import FormCRUD from "../partials/Form/Form";
import FormShema from "../partials/Form/FormSchema";
import Toast from "../partials/Toast";

export default function CreatePage(props: any) {

  const { data, createData } = useCRUD()

  const getReturnCreatAPI = (value: any) => {
    if (value) {
      createData(value)
    }
  };

  return (
    <div>
      {props.schemaForm ? (
        <FormShema propsFormSchema={props.schemaForm} />
      ) : (
        <FormCRUD
          title={Object.keys(data[0])}
          createUser={getReturnCreatAPI}
        />
      )}
      <Toast />
    </div>
  )
}