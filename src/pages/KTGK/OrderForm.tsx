import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function OrderForm({
  orders,
  setOrders,
  customers,
  products,
  editing,
  setEditing
}: any) {

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      setOpen(true);
      form.setFieldsValue({
        ...editing,
        date: dayjs(editing.date)
      });
    }
  }, [editing]);

  const submit = (values: any) => {
    const total = values.products.reduce((s: number, p: number) => {
      const product = products.find((x: any) => x.id === p);
      return s + (product?.price || 0);
    }, 0);

    const newOrder = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      total
    };

    if (editing) {
      setOrders(orders.map((o: any) => o.id === editing.id ? newOrder : o));
      setEditing(null);
    } else {
      if (orders.find((o: any) => o.id === values.id)) {
        alert('Trùng mã đơn');
        return;
      }
      setOrders([...orders, newOrder]);
    }

    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Thêm đơn</Button>

      <Modal visible={open} onOk={() => form.submit()} onCancel={() => setOpen(false)}>
        <Form form={form} onFinish={submit} layout="vertical">

          <Form.Item name="id" label="Mã đơn" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="customerId" label="Khách hàng" rules={[{ required: true }]}>
            <Select options={customers.map((c: any) => ({ value: c.id, label: c.name }))} />
          </Form.Item>

          <Form.Item name="date" label="Ngày" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="products" label="Sản phẩm" rules={[{ required: true }]}>
            <Select mode="multiple"
              options={products.map((p: any) => ({
                value: p.id,
                label: `${p.name} (${p.price.toLocaleString('vi-VN')})`
              }))}
            />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'Chờ xác nhận' },
                { value: 'Đang giao' },
                { value: 'Hoàn thành' },
                { value: 'Hủy' }
              ]}
            />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
}