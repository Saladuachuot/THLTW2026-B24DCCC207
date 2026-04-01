import { Modal, Table } from 'antd';
import { History } from './index';

interface Props {
  visible: boolean;
  history: History[];
  onClose: () => void;
}

export default function HistoryModal({ visible, history, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      title="Lịch sử"
    >
      <Table
        rowKey="id"
        dataSource={history}
        columns={[
          { title: 'Hành động', dataIndex: 'action' },
          { title: 'Thời gian', dataIndex: 'time' },
          { title: 'Ghi chú', dataIndex: 'note' },
        ]}
      />
    </Modal>
  );
}