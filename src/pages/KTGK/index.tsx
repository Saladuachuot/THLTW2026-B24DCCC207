import { useState } from 'react';
import OrderTable from './OrderTable';
import OrderForm from './OrderForm';
import FilterBar from './FilterBar';

export interface Customer {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export type Status = 'Chờ xác nhận' | 'Đang giao' | 'Hoàn thành' | 'Hủy';

export interface Order {
  id: string;
  customerId: number;
  date: string;
  products: number[];
  total: number;
  status: Status;
}

export default function Page() {
  const [customers] = useState<Customer[]>([
    { id: 1, name: 'Nguyễn Văn A' },
    { id: 2, name: 'Trần Thị B' },
    { id: 3, name: 'Vũ Văn C'},
    { id: 4, name: 'Bùi Thị D'},
    { id: 5, name: 'Phạm Văn E'},
    { id: 6, name: 'Nguyễn Văn F' },
    { id: 7, name: 'Trần Thị G' },
    { id: 8, name: 'Vũ Văn H'},
    { id: 9, name: 'Bùi Thị I'},
    { id: 10, name: 'Phạm Văn J'},
  ]);

  const [products] = useState<Product[]>([
    { id: 1, name: 'Áo ngắn tay', price: 500000 },
    { id: 2, name: 'Áo dài tay', price: 800000 },
    { id: 3, name: 'Áo khoác', price: 1200000 },
    { id: 4, name: 'Quần đùi', price: 400000 },
    { id: 5, name: 'Quần dài', price: 800000 },
    { id: 6, name: 'Quần bò', price: 900000 },
    { id: 7, name: 'Mũ lưỡi chai', price: 200000 },
    { id: 8, name: 'Tất', price: 50000 },
    { id: 9, name: 'Giày', price: 2500000 },
    { id: 10, name: 'Dép', price: 500000 },
    { id: 11, name: 'Khăn quàng cổ', price: 250000 },
    { id: 12, name: 'Găng tay', price: 300000 }
  ]);

  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState<Order | null>(null);
  const [filter, setFilter] = useState<any>({});

  let filtered = orders.filter(o => {
    if (filter.keyword) {
      const customer = customers.find(c => c.id === o.customerId)?.name || '';
      if (!o.id.includes(filter.keyword) && !customer.includes(filter.keyword))
        return false;
    }
    if (filter.status && o.status !== filter.status) return false;
    return true;
  });

  if (filter.sort === 'date') {
    filtered = [...filtered].sort((a, b) => a.date.localeCompare(b.date));
  }

  if (filter.sort === 'total') {
    filtered = [...filtered].sort((a, b) => a.total - b.total);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý đơn hàng</h2>

      <FilterBar setFilter={setFilter} />

      <OrderForm
        orders={orders}
        setOrders={setOrders}
        customers={customers}
        products={products}
        editing={editing}
        setEditing={setEditing}
      />

      <OrderTable
        data={filtered}
        setOrders={setOrders}
        customers={customers}
        setEditing={setEditing}
      />
    </div>
  );
}