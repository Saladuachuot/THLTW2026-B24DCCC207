import { Card, Button, Drawer, Input, Popconfirm } from 'antd';
import { useState } from 'react';

export default ({ data, setData }: any) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const add = () => {
    if (!name) return;
    setData([...data, { id: Date.now(), name }]);
    setName('');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Thêm</Button>

      {data.map((g: any) => (
        <Card key={g.id} style={{ marginTop: 10 }}>
          {g.name}
          <Popconfirm onConfirm={() => setData(data.filter((d: any) => d.id !== g.id))}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Card>
      ))}

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Input value={name} onChange={e => setName(e.target.value)} />
        <Button type="primary" onClick={add}>Lưu</Button>
      </Drawer>
    </>
  );
};