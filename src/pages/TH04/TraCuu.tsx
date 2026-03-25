
import { useState } from 'react';
import { Input, Button, message, Table } from 'antd';

// type local
interface VanBang {
  MaVB: number;
  SoVaoSo: number;
  SoHieu: string;
  MaSinhVien: string;
  HoTen: string;
}

interface Props {
  data: VanBang[];
}

export default ({ data }: Props) => {
  const [search, setSearch] = useState<Partial<VanBang>>({});
  const [result, setResult] = useState<VanBang[]>([]);

  const handleSearch = () => {
    const filled = Object.values(search).filter(v => v);
    if (filled.length < 2) {
      message.error('Nhập ít nhất 2 điều kiện!');
      return;
    }

    const filtered = data.filter(item =>
      (!search.SoHieu || item.SoHieu === search.SoHieu) &&
      (!search.MaSinhVien || item.MaSinhVien === search.MaSinhVien) &&
      (!search.HoTen || item.HoTen.toLowerCase().includes((search.HoTen || '').toLowerCase()))
    );

    setResult(filtered);
  };

  const columns = [
    { title: 'Số vào sổ', dataIndex: 'SoVaoSo' },
    { title: 'Số hiệu', dataIndex: 'SoHieu' },
    { title: 'Họ tên', dataIndex: 'HoTen' },
  ];

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Tra cứu</h3>

      <Input
        placeholder="Số hiệu"
        style={{ marginBottom: 5 }}
        onChange={(e) => setSearch({ ...search, SoHieu: e.target.value })}
      />

      <Input
        placeholder="MSV"
        style={{ marginBottom: 5 }}
        onChange={(e) => setSearch({ ...search, MaSinhVien: e.target.value })}
      />

      <Input
        placeholder="Họ tên"
        style={{ marginBottom: 5 }}
        onChange={(e) => setSearch({ ...search, HoTen: e.target.value })}
      />

      <Button type="primary" onClick={handleSearch}>
        Tìm
      </Button>

      <Table
        style={{ marginTop: 20 }}
        dataSource={result}
        columns={columns}
        rowKey="MaVB"
      />
    </div>
  );
};