import { Modal, Form, Input, Button, Select } from 'antd';
import { useState, useEffect } from 'react';

export default ({ posts, setPosts, editing, setEditing, tags }: any) => {
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
      setPosts(posts.map((p: any) => (p.id === editing.id ? { ...p, ...values } : p)));
      setEditing(null);
    } else {
      setPosts([
        ...posts,
        {
          ...values,
          id: Date.now(),
          views: 0,
          createdAt: new Date().toISOString(),
          author: 'Admin'
        }
      ]);
    }

    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Thêm bài</Button>

      <Modal open={open} onOk={() => form.submit()} onCancel={() => setOpen(false)}>
        <Form form={form} onFinish={submit} layout="vertical">
          <Form.Item name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="slug" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="content" rules={[{ required: true }]}><Input.TextArea rows={5} /></Form.Item>
          <Form.Item name="thumbnail" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="tags"><Select mode="multiple" options={tags.map((t: string) => ({ value: t }))} /></Form.Item>
          <Form.Item name="status"><Select options={[{ value: 'Nháp' }, { value: 'Đã đăng' }]} /></Form.Item>
        </Form>
      </Modal>
    </>
  );
};