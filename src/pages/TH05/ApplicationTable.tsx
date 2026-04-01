import { Table, Button, Modal, Input } from 'antd';
import { useState } from 'react';
import { Application, Club, History } from './index';
import HistoryModal from './HistoryModal';

interface Props {
  data: Application[];
  setData: (data: Application[]) => void;
  clubs: Club[];
  addHistory: any;
  history: History[];
}

export default ({ data, setData, clubs, addHistory, history }: Props) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [note, setNote] = useState('');
  const [historyOpen, setHistoryOpen] = useState(false);

  const approve = () => {
    setData(data.map(d =>
      selected.includes(d.id) ? { ...d, status: 'Approved' } : d
    ));

    selected.forEach(id => addHistory(id, 'Approved', ''));
  };

  const reject = () => {
    if (!note) return alert('Nhập lý do');

    setData(data.map(d =>
      selected.includes(d.id)
        ? { ...d, status: 'Rejected', note }
        : d
    ));

    selected.forEach(id => addHistory(id, 'Rejected', note));

    setRejectOpen(false);
  };

  return (
    <>
      <h2>Đơn</h2>

      <Button onClick={approve}>Duyệt {selected.length}</Button>
      <Button danger onClick={() => setRejectOpen(true)}>Từ chối</Button>
      <Button onClick={() => setHistoryOpen(true)}>Xem history</Button>

      <Table
        rowKey="id"
        rowSelection={{
          onChange: keys => setSelected(keys as number[])
        }}
        dataSource={data}
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'SĐT', dataIndex: 'phone' },
          { title: 'Giới tính', dataIndex: 'gender' },
          {
            title: 'CLB',
            render: r => clubs.find(c => c.id === r.clubId)?.name
          },
          { title: 'Trạng thái', dataIndex: 'status' }
        ]}
      />

      <Modal visible={rejectOpen} onOk={reject} onCancel={() => setRejectOpen(false)}>
        <Input onChange={e => setNote(e.target.value)} placeholder="Lý do từ chối" />
      </Modal>

      <HistoryModal visible={historyOpen} history={history} onClose={() => setHistoryOpen(false)} />
    </>
  );
};