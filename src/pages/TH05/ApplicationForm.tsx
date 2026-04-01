import { Modal, Form, Input, Select } from 'antd';
import { Application, Club } from './index';

interface Props {
  visible: boolean;
  onClose: () => void;
  data: Application[];
  setData: (data: Application[]) => void;
  clubs: Club[];
}

export default function ApplicationForm({ visible, onClose, data, setData, clubs }: Props) {
  const [form] = Form.useForm();

  const submit = (values: any) => {
    setData([
      ...data,
      {
        id: Date.now(),
        ...values,
        status: 'Pending', // 🔥 QUAN TRỌNG
      }
    ]);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      title="Đăng ký CLB"
    >
      <Form form={form} onFinish={submit} layout="vertical">

        <Form.Item name="name" label="Họ tên" required>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" required>
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="SĐT">
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính">
          <Select options={[
            { label: 'Nam', value: 'Nam' },
            { label: 'Nữ', value: 'Nữ' }
          ]} />
        </Form.Item>

        <Form.Item name="address" label="Địa chỉ">
          <Input />
        </Form.Item>

        <Form.Item name="skill" label="Sở trường">
          <Input />
        </Form.Item>

        <Form.Item name="clubId" label="CLB" required>
          <Select
            options={clubs.map(c => ({
              label: c.name,
              value: c.id
            }))}
          />
        </Form.Item>

        <Form.Item name="reason" label="Lý do">
          <Input.TextArea />
        </Form.Item>

      </Form>
    </Modal>
  );
}