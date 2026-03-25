import { Table } from 'antd';

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
  const columns = [
    { title: 'Số vào sổ', dataIndex: 'SoVaoSo' },
    { title: 'Số hiệu', dataIndex: 'SoHieu' },
    { title: 'Họ tên', dataIndex: 'HoTen' },
    { title: 'MSV', dataIndex: 'MaSinhVien' },
  ];

  return (
    <Table
      style={{ marginTop: 20 }}
      dataSource={data}
      columns={columns}
      rowKey="MaVB"
    />
  );
};