import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";

export default function FormCRUD(props: any) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('Are you sure?');

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

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    props.delUser(props.data.id)
    setModalText('Accept Delete');
    setVisible(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
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
        <Button type="primary" onClick={showModal}>Delete</Button>
        <Modal
          title="Delete"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <p>{modalText}</p>
        </Modal>
      </div>
    </div>
  );
}