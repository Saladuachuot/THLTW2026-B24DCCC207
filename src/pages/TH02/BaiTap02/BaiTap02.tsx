import { Tabs, Card } from "antd";
import KhoiKienThuc from "./KhoiKienThuc";
import MonHoc from "./MonHoc";
import CauHoi from "./CauHoi";
import TaoDe from "./TaoDe";

const BaiTap02 = () => {

  const items = [
    {
      key: "1",
      label: "Khối kiến thức",
      children: <KhoiKienThuc />
    },
    {
      key: "2",
      label: "Môn học",
      children: <MonHoc />
    },
    {
      key: "3",
      label: "Câu hỏi",
      children: <CauHoi />
    },
    {
      key: "4",
      label: "Tạo đề",
      children: <TaoDe />
    }
  ];

  return (
    <Card style={{ width: 700, margin: "30px auto" }}>
      <h2>Quản lý ngân hàng câu hỏi</h2>
      <Tabs items={items} />
    </Card>
  );
};

export default BaiTap02;