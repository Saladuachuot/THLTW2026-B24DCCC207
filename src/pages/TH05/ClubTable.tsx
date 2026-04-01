import { Table, Button, Input, Switch, Modal } from 'antd';
import { useState } from 'react';
import { Club, Application } from './index';
import ClubForm from './ClubForm';

interface Props {
  data: Club[];
  setData: (data: Club[]) => void;
  applications: Application[];
}

export default ({ data, setData, applications }: Props) => {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<Club | null>(null);
  const [members, setMembers] = useState<Application[]>([]);
  const [memberOpen, setMemberOpen] = useState(false);

  const filtered = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      title: 'Ảnh',
      render: (r: Club) => <img src={r.avatar} width={40} />
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: (a: Club, b: Club) => a.name.localeCompare(b.name)
    },
    { title: 'Ngày TL', dataIndex: 'createdAt' },
    {
      title: 'Mô tả',
      render: (r: Club) => <div dangerouslySetInnerHTML={{ __html: r.description }} />
    },
    { title: 'Chủ nhiệm', dataIndex: 'leader' },
    {
      title: 'Hoạt động',
      render: (r: Club) => <Switch checked={r.active} disabled />
    },
    {
      title: 'Hành động',
      render: (r: Club) => (
        <>
          <Button onClick={() => { setEditing(r); setVisible(true); }}>Sửa</Button>
          <Button danger onClick={() => setData(data.filter(d => d.id !== r.id))}>Xóa</Button>
          <Button onClick={() => {
            setMembers(applications.filter(a => a.clubId === r.id && a.status === 'Approved'));
            setMemberOpen(true);
          }}>Thành viên</Button>
        </>
      )
    }
  ];

  return (
    <>
      <h2>CLB</h2>

      <Input placeholder="Search..." onChange={e => setSearch(e.target.value)} />

      <Button onClick={() => setVisible(true)}>Thêm</Button>

      <Table rowKey="id" dataSource={filtered} columns={columns} />

      <ClubForm
        visible={visible}
        onClose={() => setVisible(false)}
        data={data}
        setData={setData}
        editing={editing}
      />

      <Modal visible={memberOpen} onCancel={() => setMemberOpen(false)} footer={null}>
        <Table
          rowKey="id"
          dataSource={members}
          columns={[
            { title: 'Tên', dataIndex: 'name' },
            { title: 'Email', dataIndex: 'email' }
          ]}
        />
      </Modal>
    </>
  );
};