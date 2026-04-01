import { Table, Button, Modal, Input, Space } from 'antd';
import { useState } from 'react';
import { Application, Club, History } from './index';
import HistoryModal from './HistoryModal';
import ApplicationForm from './ApplicationForm';

interface Props {
  data: Application[];
  setData: (data: Application[]) => void;
  clubs: Club[];
  addHistory: (id: number, action: string, note: string) => void;
  history: History[];
}

export default function ApplicationTable({
  data,
  setData,
  clubs,
  addHistory,
  history,
}: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [note, setNote] = useState('');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);


  const approve = () => {
    if (selected.length === 0) return;

    setData(
      data.map((d) =>
        selected.includes(d.id) ? { ...d, status: 'Approved' } : d
      )
    );

    selected.forEach((id) => addHistory(id, 'Approved', ''));

    setSelected([]);
  };

  
  const reject = () => {
    if (!note) {
      alert('Nhập lý do từ chối');
      return;
    }

    setData(
      data.map((d) =>
        selected.includes(d.id)
          ? { ...d, status: 'Rejected', note }
          : d
      )
    );

    selected.forEach((id) => addHistory(id, 'Rejected', note));

    setRejectOpen(false);
    setNote('');
    setSelected([]);
  };

  return (
    <>
      <h2>Đơn đăng ký</h2>

      <Space style={{ marginBottom: 10 }}>
        <Button type="primary" onClick={() => setCreateOpen(true)}>
          Thêm đơn
        </Button>

        <Button onClick={approve}>
          Duyệt {selected.length}
        </Button>

        <Button danger onClick={() => setRejectOpen(true)}>
          Từ chối {selected.length}
        </Button>

        <Button onClick={() => setHistoryOpen(true)}>
          Xem lịch sử
        </Button>
      </Space>

      <Table
        rowKey="id"
        rowSelection={{
          onChange: (keys) => setSelected(keys as number[]),
        }}
        dataSource={data}
        columns={[
          { title: 'Họ tên', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'SĐT', dataIndex: 'phone' },
          { title: 'Giới tính', dataIndex: 'gender' },
          { title: 'Địa chỉ', dataIndex: 'address' },
          { title: 'Sở trường', dataIndex: 'skill' },
          {
            title: 'CLB',
            render: (r: Application) =>
              clubs.find((c) => c.id === r.clubId)?.name || '',
          },
          { title: 'Lý do', dataIndex: 'reason' },
          { title: 'Trạng thái', dataIndex: 'status' },
          { title: 'Ghi chú', dataIndex: 'note' },
        ]}
      />

      
      <Modal
        visible={rejectOpen}
        onOk={reject}
        onCancel={() => setRejectOpen(false)}
        title="Nhập lý do từ chối"
      >
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nhập lý do..."
        />
      </Modal>

      
      <ApplicationForm
        visible={createOpen}
        onClose={() => setCreateOpen(false)}
        data={data}
        setData={setData}
        clubs={clubs}
      />

      
      <HistoryModal
        visible={historyOpen}
        history={history}
        onClose={() => setHistoryOpen(false)}
      />
    </>
  );
}