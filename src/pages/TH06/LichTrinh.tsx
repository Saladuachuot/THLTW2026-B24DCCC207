import { Select, Button, Table } from 'antd';
import { Destination, PlanItem } from './index';

interface Props {
  plan: PlanItem[];
  setPlan: (p: PlanItem[]) => void;
  destinations: Destination[];
}

export default function LichTrinh({ plan, setPlan, destinations }: Props) {

  const add = (id: number) => {
    setPlan([...plan, { id: Date.now(), day: 1, destinationId: id }]);
  };

  const remove = (id: number) => {
    setPlan(plan.filter((p: PlanItem) => p.id !== id));
  };

  return (
    <>
      <h2>Lịch trình</h2>

      <Select
        style={{ width: 200 }}
        onChange={add}
        options={destinations.map((d: Destination) => ({
          label: d.name,
          value: d.id
        }))}
      />

      <Table
        rowKey="id"
        dataSource={[...plan].sort((a, b) => a.day - b.day)}
        columns={[
          {
            title: 'Ngày',
            render: (p: PlanItem) => (
              <input
                value={p.day}
                onChange={(e) => {
                  const newPlan = plan.map((x: PlanItem) =>
                    x.id === p.id ? { ...x, day: Number(e.target.value) } : x
                  );
                  setPlan(newPlan);
                }}
              />
            )
          },
          {
            title: 'Địa điểm',
            render: (p: PlanItem) =>
              destinations.find(d => d.id === p.destinationId)?.name
          },
          {
            title: 'Xóa',
            render: (p: PlanItem) =>
              <Button onClick={() => remove(p.id)}>Xóa</Button>
          }
        ]}
      />
    </>
  );
}