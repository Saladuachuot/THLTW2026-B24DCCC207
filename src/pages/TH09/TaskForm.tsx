import { Modal, Form, Input, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export default ({ open, setOpen, editing, tasks, setTasks }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        ...editing,
        deadline: editing.deadline ? dayjs(editing.deadline) : null,
        tags: editing.tags ? editing.tags.join(', ') : ''
      });
    } else {
      form.resetFields();
    }
  }, [editing]);

  const submit = (v: any) => {
    v.deadline = v.deadline.format('YYYY-MM-DD');

    v.tags = v.tags
      ? v.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

    if (editing) {
      setTasks(
        tasks.map((t: any) =>
          t.id === editing.id ? { ...t, ...v } : t
        )
      );
    } else {
      setTasks([
        ...tasks,
        { ...v, id: Date.now(), status: 'todo' }
      ]);
    }

    setOpen(false);
  };

  return (
    <Modal
      visible={open}   
      onOk={() => form.submit()}
      onCancel={() => setOpen(false)}
      title="Task"
    >
      <Form form={form} onFinish={submit} layout="vertical">
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Tên task" />
        </Form.Item>

        <Form.Item name="description">
          <Input.TextArea
            placeholder="Mô tả công việc"
            rows={3}
          />
        </Form.Item>

        <Form.Item name="deadline" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="priority" rules={[{ required: true }]}>
          <Select placeholder="Mức độ ưu tiên">
            <Select.Option value="Cao">Cao</Select.Option>
            <Select.Option value="Trung bình">Trung bình</Select.Option>
            <Select.Option value="Thấp">Thấp</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="tags">
          <Input placeholder="Tags" />
        </Form.Item>

      </Form>
    </Modal>
  );
};