import { Table, Button, Modal, Form, Input, Select, DatePicker, Popconfirm } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';

export default ({ data, setData }: any) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const submit = (v: any) => {
    v.date = v.date.format('YYYY-MM-DD');

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
          { title: 'Loại', dataIndex: 'type' },
          { title: 'Phút', dataIndex: 'duration' },
          { title: 'Calo', dataIndex: 'calo' },
          {
            render: (r: any) => (
              <>
                <Button onClick={() => {
                  setEditing(r);
                  form.setFieldsValue({ ...r, date: dayjs(r.date) });
                  setOpen(true);
                }}>
                  Sửa
                </Button>

                <Popconfirm title="Xóa?" onConfirm={() => setData(data.filter((d: any) => d.id !== r.id))}>
                  <Button danger>Xóa</Button>
                </Popconfirm>
              </>
            )
          }
        ]}
      />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={submit} layout="vertical">
          <Form.Item name="date" rules={[{ required: true }]}><DatePicker /></Form.Item>
          <Form.Item name="type" rules={[{ required: true }]}>
            <Select options={['Cardio','Strength','Yoga','HIIT','Other'].map(v => ({ value: v }))} />
          </Form.Item>
          <Form.Item name="duration" rules={[{ required: true }]}><Input type="number" /></Form.Item>
          <Form.Item name="calo" rules={[{ required: true }]}><Input type="number" /></Form.Item>
        </Form>
      </Modal>
    </>
  );
};