import { Table, Button, Modal, Input } from 'antd';
import { useState } from 'react';

export default ({ tags, setTags, posts }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <>
      <Button onClick={() => setOpen(true)}>Thêm tag</Button>

      <Table
        rowKey="name"
        dataSource={tags.map((t: string) => ({ name: t }))}
        columns={[
          { title: 'Tag', dataIndex: 'name' },
          {
            title: 'Số bài',
            render: (r: any) => posts.filter((p: any) => p.tags.includes(r.name)).length
          }
        ]}
      />

      <Modal open={open} onOk={() => { setTags([...tags, value]); setOpen(false); }}>
        <Input onChange={e => setValue(e.target.value)} />
      </Modal>
    </>
  );
};