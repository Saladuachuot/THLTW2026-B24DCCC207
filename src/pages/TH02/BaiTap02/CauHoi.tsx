import { useState, useEffect } from "react";
import { Input, Button, Select } from "antd";

const CauHoi = () => {

  const [cauHoi, setCauHoi] = useState<any[]>([]);
  const [monHoc, setMonHoc] = useState<any[]>([]);
  const [khoi, setKhoi] = useState<any[]>([]);

  const [monChon, setMonChon] = useState("");
  const [khoiChon, setKhoiChon] = useState("");
  const [mucDo, setMucDo] = useState("");
  const [noiDung, setNoiDung] = useState("");

  useEffect(() => {

    let c = localStorage.getItem("cauHoi");
    let m = localStorage.getItem("monHoc");
    let k = localStorage.getItem("khoiKienThuc");

    if (c) setCauHoi(JSON.parse(c));
    if (m) setMonHoc(JSON.parse(m));
    if (k) setKhoi(JSON.parse(k));

  }, []);

  useEffect(() => {
    localStorage.setItem("cauHoi", JSON.stringify(cauHoi));
  }, [cauHoi]);

  function themCauHoi() {

    let arr = [...cauHoi];

    arr.push({
      id: Date.now(),
      monHoc: monChon,
      khoiKienThuc: khoiChon,
      mucDo: mucDo,
      noiDung: noiDung
    });

    setCauHoi(arr);

    setNoiDung("");
  }

  return (
    <div>

      <Select
        style={{ width: "100%" }}
        placeholder="Chọn môn"
        onChange={(value) => setMonChon(value)}
      >
        {monHoc.map((m) => (
          <Select.Option key={m.id} value={m.maMon}>
            {m.tenMon}
          </Select.Option>
        ))}
      </Select>

      <br /><br />

      <Select
        style={{ width: "100%" }}
        placeholder="Chọn khối"
        onChange={(value) => setKhoiChon(value)}
      >
        {khoi.map((k) => (
          <Select.Option key={k.id} value={k.ten}>
            {k.ten}
          </Select.Option>
        ))}
      </Select>

      <br /><br />

      <Select
        style={{ width: "100%" }}
        placeholder="Mức độ"
        onChange={(value) => setMucDo(value)}
      >
        <Select.Option value="Dễ">Dễ</Select.Option>
        <Select.Option value="Trung bình">Trung bình</Select.Option>
        <Select.Option value="Khó">Khó</Select.Option>
      </Select>

      <br /><br />

      <Input
        placeholder="Nội dung câu hỏi"
        value={noiDung}
        onChange={(e) => setNoiDung(e.target.value)}
      />

      <br /><br />

      <Button onClick={themCauHoi}>
        Thêm câu hỏi
      </Button>

      <hr />

      {cauHoi.map((c) => (
        <p key={c.id}>
          {c.monHoc} | {c.mucDo} | {c.noiDung}
        </p>
      ))}

    </div>
  );
};

export default CauHoi;