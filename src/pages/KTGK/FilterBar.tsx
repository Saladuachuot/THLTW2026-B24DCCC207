import { Input, Select } from 'antd';

export default function FilterBar({ setFilter }: any) {
  return (
    <div style={{ marginBottom: 10, display: 'flex', gap: 10 }}>
      <Input
        placeholder="Tìm mã / khách hàng"
        onChange={e => setFilter((f: any) => ({ ...f, keyword: e.target.value }))}
      />

      <Select
        placeholder="Trạng thái"
        style={{ width: 150 }}
        allowClear
        onChange={v => setFilter((f: any) => ({ ...f, status: v }))}
        options={[
          { value: 'Chờ xác nhận' },
          { value: 'Đang giao' },
          { value: 'Hoàn thành' },
          { value: 'Hủy' }
        ]}
      />

      <Select
        placeholder="Sắp xếp"
        style={{ width: 150 }}
        onChange={v => setFilter((f: any) => ({ ...f, sort: v }))}
        options={[
          { value: 'date', label: 'Ngày' },
          { value: 'total', label: 'Tổng tiền' }
        ]}
      />
    </div>
  );
}