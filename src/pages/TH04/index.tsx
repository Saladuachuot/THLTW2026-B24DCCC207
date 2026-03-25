import { useState, useEffect } from 'react';
import { Button } from 'antd';
import FormVanBang from './FormVanBang';
import TableVanBang from './TableVanBang';
import TraCuu from './TraCuu';

// ✅ type viết trực tiếp
export interface VanBang {
  MaVB: number;
  SoVaoSo: number;
  SoHieu: string;
  MaSinhVien: string;
  HoTen: string;
}

const STORAGE_KEY = 'vanbang_data';

export default () => {
  const [data, setData] = useState<VanBang[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const getNextSo = () => {
    if (data.length === 0) return 1;
    return Math.max(...data.map(d => d.SoVaoSo)) + 1;
  };

  const handleAdd = (values: Omit<VanBang, 'MaVB' | 'SoVaoSo'>) => {
    const newItem: VanBang = {
      MaVB: Date.now(),
      SoVaoSo: getNextSo(),
      ...values,
    };

    setData([...data, newItem]);
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData([]);
  };

  return (
    <div>
      <h2>Quản lý văn bằng</h2>

      <FormVanBang onAdd={handleAdd} />

      <Button danger onClick={handleClear} style={{ marginTop: 10 }}>
        Xóa toàn bộ dữ liệu
      </Button>

      <TableVanBang data={data} />

      <TraCuu data={data} />
    </div>
  );
};