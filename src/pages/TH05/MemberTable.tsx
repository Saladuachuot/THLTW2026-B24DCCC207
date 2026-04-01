import { Table, Button, Modal, Select } from 'antd';
import { useState } from 'react';

interface Application {
  id: number;
  name: string;
  email: string;
  status: string;
  clubId: number;
}

interface Club {
  id: number;
  name: string;
}

interface Props {
  applications: Application[];
  setApplications: (data: Application[]) => void;
  clubs: Club[];
}

export default ({ applications, setApplications, clubs }: Props) => {
  const members = applications.filter(a => a.status === 'Approved');

  const [selected, setSelected] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const [clubId, setClubId] = useState<number>(0);

  const changeClub = () => {
    if (!clubId) return;

    setApplications(applications.map(a =>
      selected.includes(a.id)
        ? { ...a, clubId }
        : a
    ));

    setVisible(false);
  };

  return (
    <>
      <h2>Thành viên</h2>

      <Button onClick={() => setVisible(true)}>
        Chuyển {selected.length} thành viên
      </Button>

      <Table
        rowKey="id"
        rowSelection={{
          onChange: (keys) => setSelected(keys as number[])
        }}
        dataSource={members}
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
        ]}
      />

      <Modal
        visible={visible}
        onOk={changeClub}
        onCancel={() => setVisible(false)}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn CLB"
          options={clubs.map(c => ({
            label: c.name,
            value: c.id
          }))}
          onChange={(value) => setClubId(value)}
        />
      </Modal>
    </>
  );
};