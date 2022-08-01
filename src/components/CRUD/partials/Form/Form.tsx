import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useCRUD } from "../../hooks/CRUDProvider";

export default function FormCRUD(props: any) {
  const [form, setForm] = useState<any>([]);

  const { title } = useCRUD();

  const inputForm: any = [];
  const newData: any = [];

  const [dataForm, setDataForm] = useState(newData);

  if (title) {
    title.map((item: any) => {
      inputForm.push({ key: item, content: null });
    });
  }
  if (props.data) {
    const [dataTest, setDataTest] = useState<any>(props.data[3]);
    const keyDataTest: any = Object.keys(dataTest);
    const valueDataTest: any = Object.values(dataTest);
    for (let i = 0; i < keyDataTest.length; i++) {
      newData.push({ key: keyDataTest[i], value: valueDataTest[i] });
    }
  }

  let newForm: any = [];
  const updateForm = (key: any, value: any) => {
    newForm = dataForm.map((field: any) => {
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
    console.log(form);
  };

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
        // <form>
        //   {dataForm.map((item: any, index: number) => (
        //     <div key={index}>
        //       <label>{item.key}</label>
        //       <input
        //         value={item.value}
        //         onChange={(e) => updateForm(item.key, e.target.value)}
        //       />
        //     </div>
        //   ))}
        // </form>

        <Form {...layout} onFinish={onFinish}>
          {dataForm.map((item: any, index: number) => (
            <div key={index}>
              <Form.Item name={["user", item.key]} label={item.key}>
                <input value={item.value} onChange={(e) => updateForm(item.key, e.target.value)} />
              </Form.Item>
            </div>
          ))}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      ) : (
        <form>
          {inputForm &&
            inputForm.map((item: any) => (
              <div key={item}>
                <label>{item.key}</label>
                <input
                  onChange={(e) => {
                    item.value = e.target.value;
                  }}
                />
              </div>
            ))}
        </form>
      )}
      <button onClick={handleInput}>Submit</button>
    </div>
  );
}