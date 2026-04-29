import { Table, Button, Modal, Form, Input, Tag, Popconfirm } from 'antd';
import { useState } from 'react';

const getBMI = (w: number, h: number) => w / ((h / 100) ** 2);

export default ({ data, setData }: any) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const submit = (v: any) => {
    if (editing) {
      setData(data.map((d: any) => d.id === editing.id ? { ...d, ...v } : d));
    } else {
      setData([...data, { ...v, id: Date.now() }]);
    }

    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  return (
    <>
      <Button onClick={() => {
        setEditing(null);
        form.resetFields();
        setOpen(true);
      }}>
        Thêm
      </Button>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: 'Ngày', dataIndex: 'date' },
          { title: 'Kg', dataIndex: 'weight' },
          { title: 'Cm', dataIndex: 'height' },
          {
            title: 'BMI',
            render: (r: any) => {
              const bmi = getBMI(r.weight, r.height);
              return <Tag>{bmi.toFixed(1)}</Tag>;
            }
          },
          {
            render: (r: any) => (
              <>
                <Button onClick={() => {
                  setEditing(r);
                  form.setFieldsValue(r);
                  setOpen(true);
                }}>
                  Sửa
                </Button>

                <Popconfirm onConfirm={() => setData(data.filter((d: any) => d.id !== r.id))}>
                  <Button danger>Xóa</Button>
                </Popconfirm>
              </>
            )
          }
        ]}
      />

      <Modal open={open} onOk={() => form.submit()} onCancel={() => setOpen(false)}>
        <Form form={form} onFinish={submit}>
          <Form.Item name="date" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="weight" rules={[{ required: true }]}><Input type="number" /></Form.Item>
          <Form.Item name="height" rules={[{ required: true }]}><Input type="number" /></Form.Item>
        </Form>
      </Modal>
    </>
  );
};