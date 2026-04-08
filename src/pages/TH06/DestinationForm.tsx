import { Modal, Form, Input, Button, InputNumber, Select } from 'antd';
import { useState, useEffect } from 'react';
import { Destination } from './index';

interface Props {
  data: Destination[];
  setData: (d: Destination[]) => void;
  editing: Destination | null;
  setEditing: (d: Destination | null) => void;
}

export default function DestinationForm({
  data,
  setData,
  editing,
  setEditing
}: Props) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      setOpen(true);
      form.setFieldsValue(editing);
    }
  }, [editing]);

  const submit = (values: any) => {
    if (editing) {
      setData(data.map(d => d.id === editing.id ? { ...editing, ...values } : d));
      setEditing(null);
    } else {
      setData([
        ...data,
        {
          id: Date.now(),
          ...values
        }
      ]);
    }

    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Thêm</Button>

      <Modal
        visible={open}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={submit} layout="vertical">

          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="type" label="Loại hình" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'Biển', label: 'Biển' },
                { value: 'Núi', label: 'Núi' },
                { value: 'Thành phố', label: 'Thành phố' }
              ]}
            />
          </Form.Item>

          <Form.Item name="image" label="Ảnh" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input />
          </Form.Item>

          <Form.Item name="rating" label="Rating">
            <InputNumber min={0} max={5} step={0.5} />
          </Form.Item>

          <Form.Item name="foodCost" label="Giá ăn uống" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="hotelCost" label="Giá lưu trú" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="transportCost" label="Giá di chuyển" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
}