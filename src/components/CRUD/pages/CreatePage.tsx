import React, { useEffect } from "react";
import { useCRUD } from "../hooks/CRUDProvider";
import FormCRUD from "../partials/Form/Form";
import FormShema from "../partials/Form/FormSchema";
import ModalList from "../partials/Modal";
import Title from "../partials/Title";
import Toast from "../partials/Toast";

export default function CreatePage(schemaForm: any) {
  const { data } = useCRUD()


  return (
    <div>
      {/* <Title />
      <ModalList /> */}
      {schemaForm.schemaForm ? (
        <FormShema props={schemaForm.schemaForm} />
      ) : (
        <FormCRUD
          title={Object.keys(data[0])}
        />
      )}
      <Toast />
    </div>
  );
}