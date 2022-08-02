import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function FormCRUD(props: any) {

  const [form, setForm] = useState<any>([]);
  const newData: any = [];
  const [dataForm, setDataForm] = useState(newData);

  if (props.data) {
    const keyDataTest: any = Object.keys(props.data[4]);
    const valueDataTest: any = Object.values(props.data[4]);
    for (let i = 0; i < keyDataTest.length; i++) {
      newData.push({ key: keyDataTest[i], value: valueDataTest[i] });
    }
  } else {
    props.title.map((item: any) => {
      newData.push({ key: item, value: null });
    });
  }

  const updateForm = (key: any, value: any) => {
    const newForm = dataForm.map((field: any) => {
      if (field.key === key) {
        return {
          ...field,
          value: value,
        };
      }
      return field;
    });
    setDataForm(newForm);
  };

  const handleInput = (value: any) => {
    setForm(dataForm);
    toast('Success')
  };
  console.log(form);

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <h3>update Form or default form</h3>
      {props.data ? (
        <Form {...layout} onFinish={onFinish}>
          {dataForm.map((item: any, index: number) => (
            <div key={index}>
              <Form.Item name={["user", item.key]} label={item.key} initialValue={item.value}>
                <Input value={item.value} onChange={(e) => updateForm(item.key, e.target.value)} />
              </Form.Item>
            </div>
          ))}
        </Form>
      ) : (
        <form>
          {newData &&
            newData.map((item: any) => (
              <div key={item}>
                <label>{item.key}</label>
                <input
                  value={item.value}
                  onChange={(e) => updateForm(item.key, e.target.value)}
                />
              </div>
            ))} <br />
        </form>
      )}
      <button onClick={handleInput}>Click </button>
    </div>
  );
}