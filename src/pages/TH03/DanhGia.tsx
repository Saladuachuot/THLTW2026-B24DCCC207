import { useEffect, useState } from "react";
import { Input, Button, Select, Card, Table, Space } from "antd";

export default function DanhGia() {
  const [list, setList] = useState<any[]>([]);
  const [dsNhanVien, setDsNhanVien] = useState<any[]>([]);

  const [nv, setNv] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setDsNhanVien(JSON.parse(localStorage.getItem("nhanvien") || "[]"));
    setList(JSON.parse(localStorage.getItem("danhgia") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("danhgia", JSON.stringify(list));
  }, [list]);

  const add = () => {
    setList([...list, { id: Date.now(), nv, text }]);
  };

  const columns = [
    { title: "Nhân viên", dataIndex: "nv" },
    { title: "Đánh giá", dataIndex: "text" },
  ];

  return (
    <Card title="Đánh giá">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Select placeholder="Chọn NV" onChange={setNv}>
          {dsNhanVien.map((i) => (
            <Select.Option key={i.id}>{i.name}</Select.Option>
          ))}
        </Select>

        <Input.TextArea onChange={(e) => setText(e.target.value)} />

        <Button type="primary" onClick={add}>Gửi</Button>

        <Table columns={columns} dataSource={list} rowKey="id" />
      </Space>
    </Card>
  );
}