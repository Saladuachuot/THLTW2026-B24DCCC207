import { Modal, Form, Input, Switch } from 'antd';
import { Club } from './index';

interface Props {
  visible: boolean;
  onClose: () => void;
  data: Club[];
  setData: (data: Club[]) => void;
  editing: Club | null;
}

export default function ClubForm({ visible, onClose, data, setData, editing }: Props) {
  const [form] = Form.useForm();

  const submit = (values: any) => {
    if (editing) {
      setData(data.map(d => d.id === editing.id ? { ...editing, ...values } : d));
    } else {
      setData([...data, { id: Date.now(), ...values }]);
    }
    onClose();
  };

  return (
    <Modal visible={visible} onCancel={onClose} onOk={() => form.submit()}>
      <Form form={form} onFinish={submit} initialValues={editing || { active: true }}>
        <Form.Item name="name" label="Tên CLB"><Input /></Form.Item>
        <Form.Item name="leader" label="Chủ nhiệm"><Input /></Form.Item>
        <Form.Item name="createdAt" label="Ngày TL"><Input /></Form.Item>
        <Form.Item name="avatar" label="Ảnh URL"><Input /></Form.Item>
        <Form.Item name="description" label="Mô tả"><Input.TextArea /></Form.Item>
        <Form.Item name="active" label="Hoạt động" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}