import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";

export default function FormCRUD(props: any) {
  const [form] = Form.useForm();

  if (props.data) {
    useEffect(() => {
      form.setFieldsValue(props.data);
    }, [props.data]);
  }

  const onFinish = (value: any) => {
    form.resetFields();
    if (!props.data) {
      props.createUser(value);
      toast('success')
    } else {
      props.updateUser(value);
    }
  };

  return (
    <div>
      <div>
        <Form form={form} onFinish={onFinish}>
          {props.title.map((item: any, index: number) => (
            <Form.Item key={index} name={item} label={item}>
              <Input />
            </Form.Item>
          ))}
        </Form>
        <Button onClick={form.submit}>Submit</Button>
      </div>
    </div>
  );
}