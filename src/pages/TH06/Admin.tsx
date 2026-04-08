import { Table, Button } from 'antd';
import { useState } from 'react';
import { Destination, PlanItem } from './index';
import DestinationForm from './DestinationForm';

interface Props {
  data: Destination[];
  setData: (d: Destination[]) => void;
  plan: PlanItem[];
}

export default function Admin({ data, setData }: Props) {
  const [editing, setEditing] = useState<Destination | null>(null);

  const remove = (id: number) => {
    setData(data.filter(d => d.id !== id));
  };

  return (
    <>
      <h2>Admin</h2>

      <DestinationForm
        data={data}
        setData={setData}
        editing={editing}
        setEditing={setEditing}
      />

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          {
            title: 'Giá',
            render: (r: Destination) =>
              r.foodCost + r.hotelCost + r.transportCost
          },
          {
            title: 'Sửa',
            render: (r: Destination) =>
              <Button onClick={() => setEditing(r)}>Sửa</Button>
          },
          {
            title: 'Xóa',
            render: (r: Destination) =>
              <Button danger onClick={() => remove(r.id)}>Xóa</Button>
          }
        ]}
      />
    </>
  );
}