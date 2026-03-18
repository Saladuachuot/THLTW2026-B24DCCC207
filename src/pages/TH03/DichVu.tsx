import { useEffect, useState } from "react";
import { Input, Button, Table, Card, Space, Select } from "antd";

export default function DichVu() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0") + ":00"
  );

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("dichvu") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("dichvu", JSON.stringify(list));
  }, [list]);

  const add = () => {
    setList([
      ...list,
      { id: Date.now(), name, price: Number(price), start, end },
    ]);
  };

  const del = (id: number) => {
    setList(list.filter((i) => i.id !== id));
  };

  const columns = [
    { title: "Tên", dataIndex: "name" },
    { title: "Giá", dataIndex: "price" },
    { title: "Thời gian", render: (_: any, r: any) => `${r.start} - ${r.end}` },
    {
      title: "Xoá",
      render: (_: any, r: any) => (
        <Button danger onClick={() => del(r.id)}>Xoá</Button>
      ),
    },
  ];

  return (
    <Card title="Dịch vụ">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input placeholder="Tên" onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Giá" onChange={(e) => setPrice(e.target.value)} />

        <Select placeholder="Giờ bắt đầu" onChange={setStart}>
          {hours.map((h) => <Select.Option key={h}>{h}</Select.Option>)}
        </Select>

        <Select placeholder="Giờ kết thúc" onChange={setEnd}>
          {hours.map((h) => <Select.Option key={h}>{h}</Select.Option>)}
        </Select>

        <Button type="primary" onClick={add}>Thêm</Button>

        <Table columns={columns} dataSource={list} rowKey="id" />
      </Space>
    </Card>
  );
}