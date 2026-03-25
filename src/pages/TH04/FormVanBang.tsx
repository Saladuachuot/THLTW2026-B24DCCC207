import { Form, Input, Button } from 'antd';

// type local
interface FormValues {
  SoHieu: string;
  MaSinhVien: string;
  HoTen: string;
}

interface Props {
  onAdd: (values: FormValues) => void;
}

export default ({ onAdd }: Props) => {
  const [form] = Form.useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    onAdd(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="SoHieu" label="Số hiệu" required>
        <Input />
      </Form.Item>

      <Form.Item name="MaSinhVien" label="MSV" required>
        <Input />
      </Form.Item>

      <Form.Item name="HoTen" label="Họ tên" required>
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Thêm
      </Button>
    </Form>
  );
};