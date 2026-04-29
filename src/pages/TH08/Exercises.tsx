import { Card, Button, Modal, Input } from 'antd';
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

      {data.map((e: any) => (
        <Card key={e.id} style={{ marginTop: 10 }}>
          {e.name}
        </Card>
      ))}

      <Modal open={open} onOk={add} onCancel={() => setOpen(false)}>
        <Input value={name} onChange={e => setName(e.target.value)} />
      </Modal>
    </>
  );
};