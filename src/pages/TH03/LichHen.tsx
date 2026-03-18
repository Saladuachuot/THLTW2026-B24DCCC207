import { useEffect, useState } from "react";
import { Input, Button, Select, Card, Table, Space } from "antd";

export default function LichHen() {
  const [list, setList] = useState<any[]>([]);
  const [dsNhanVien, setDsNhanVien] = useState<any[]>([]);
  const [dsDichVu, setDsDichVu] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [nhanVien, setNhanVien] = useState("");
  const [dichVu, setDichVu] = useState("");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0") + ":00"
  );

  useEffect(() => {
    setDsNhanVien(JSON.parse(localStorage.getItem("nhanvien") || "[]"));
    setDsDichVu(JSON.parse(localStorage.getItem("dichvu") || "[]"));
    setList(JSON.parse(localStorage.getItem("lichhen") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("lichhen", JSON.stringify(list));
  }, [list]);

  const add = () => {
    const trung = list.find(
      (i) =>
        i.date === date &&
        i.time === time &&
        i.nhanVien === nhanVien &&
        i.status !== "Huỷ" &&
        i.status !== "Hoàn thành"
    );
    if (trung) return alert("Trùng!");

    setList([
      ...list,
      { id: Date.now(), name, date, time, nhanVien, dichVu, status: "Chờ duyệt" },
    ]);
  };

  const columns = [
    { title: "Khách", dataIndex: "name" },
    { title: "Ngày", dataIndex: "date" },
    { title: "Giờ", dataIndex: "time" },
    { title: "NV", dataIndex: "nhanVien" },
    { title: "DV", dataIndex: "dichVu" },
  ];

  return (
    <Card title="Lịch hẹn">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input placeholder="Tên khách" onChange={(e) => setName(e.target.value)} />
        <Input type="date" onChange={(e) => setDate(e.target.value)} />

        <Select placeholder="Giờ" onChange={setTime}>
          {hours.map((h) => <Select.Option key={h}>{h}</Select.Option>)}
        </Select>

        <Select placeholder="Nhân viên" onChange={setNhanVien}>
          {dsNhanVien.map((i) => (
            <Select.Option key={i.id}>{i.name}</Select.Option>
          ))}
        </Select>

        <Select placeholder="Dịch vụ" onChange={setDichVu}>
          {dsDichVu.map((i) => (
            <Select.Option key={i.id}>{i.name}</Select.Option>
          ))}
        </Select>

        <Button type="primary" onClick={add}>Thêm</Button>

        <Table columns={columns} dataSource={list} rowKey="id" />
      </Space>
    </Card>
  );
}