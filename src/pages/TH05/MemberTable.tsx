import { Table, Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { Application, Club } from './index';

export default ({ applications, setApplications, clubs }) => {
  const members = applications.filter(a => a.status === 'Approved');
  const [selected, setSelected] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const [clubId, setClubId] = useState<number>(0);

  const change = () => {
    setApplications(applications.map(a =>
      selected.includes(a.id) ? { ...a, clubId } : a
    ));
    setVisible(false);
  };

  return (
    <>
      <h2>Members</h2>

      <Button onClick={() => setVisible(true)}>
        Chuyển {selected.length} thành viên
      </Button>

      <Table
        rowKey="id"
        rowSelection={{ onChange: keys => setSelected(keys as number[]) }}
        dataSource={members}
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' }
        ]}
      />

      <Modal visible={visible} onOk={change} onCancel={() => setVisible(false)}>
        <Select
          style={{ width: '100%' }}
          options={clubs.map(c => ({ label: c.name, value: c.id }))}
          onChange={setClubId}
        />
      </Modal>
    </>
  );
};