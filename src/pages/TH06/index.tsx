
import { useState } from 'react';
import { Tabs } from 'antd';

import TrangChu from './TrangChu';
import FilterBar from './FilterBar';
import LichTrinh from './LichTrinh';
import NganSach from './NganSach';
import Admin from './Admin';

export interface Destination {
  id: number;
  name: string;
  type: string;
  image: string;
  description?: string;
  rating?: number;

  foodCost: number;
  hotelCost: number;
  transportCost: number;
}

export interface PlanItem {
  id: number;
  day: number;
  destinationId: number;
}

export default function Page() {
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: 1,
      name: 'Đà Nẵng',
      type: 'Biển',
      image: 'https://via.placeholder.com/300',
      description: 'Thành phố đáng sống',
      rating: 4,
      foodCost: 500,
      hotelCost: 1000,
      transportCost: 300
    }
  ]);

  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [filter, setFilter] = useState<any>({});

  let filtered = destinations.filter(d => {
    const total = d.foodCost + d.hotelCost + d.transportCost;

    if (filter.type && d.type !== filter.type) return false;
    if (filter.price && total > filter.price) return false;
    if (filter.rating && (d.rating || 0) < filter.rating) return false;

    return true;
  });

  if (filter.sort === 'price') {
    filtered = [...filtered].sort(
      (a, b) =>
        (a.foodCost + a.hotelCost + a.transportCost) -
        (b.foodCost + b.hotelCost + b.transportCost)
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Trang chủ" key="1">
          <FilterBar setFilter={setFilter} />
          <TrangChu data={filtered} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Lịch trình" key="2">
          <LichTrinh plan={plan} setPlan={setPlan} destinations={destinations} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Ngân sách" key="3">
          <NganSach plan={plan} destinations={destinations} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Quản trị" key="4">
          <Admin data={destinations} setData={setDestinations} plan={plan} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}