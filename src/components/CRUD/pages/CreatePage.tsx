import React, { useEffect } from "react";
import { useCRUD } from "../hooks/CRUDProvider";
import FormCRUD from "../partials/Form/Form";
import FormShema from "../partials/Form/FormSchema";
import ModalList from "../partials/Modal";
import Title from "../partials/Title";

export default function CreatePage(schemaForm: any) {
  const { data, title, showList } = useCRUD()
  console.log('schemaForm', schemaForm);

  useEffect(showList, [])

  return (
    <div>
      {/* <Title />
      <ModalList /> */}
      {schemaForm.schemaForm ? (
        <FormShema props={schemaForm.schemaForm} />
      ) : (
        <FormCRUD
          title={title}
        />
      )}
    </div>
  );
}