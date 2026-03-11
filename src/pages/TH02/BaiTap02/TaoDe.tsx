import { useState, useEffect } from "react";
import { Input, Button, Select } from "antd";

const TaoDe = () => {

  const [monHoc, setMonHoc] = useState<any[]>([]);
  const [cauHoi, setCauHoi] = useState<any[]>([]);
  const [deThi, setDeThi] = useState<any[]>([]);

  const [monChon, setMonChon] = useState("");
  const [soCau, setSoCau] = useState("");

  useEffect(() => {

    let m = localStorage.getItem("monHoc");
    let c = localStorage.getItem("cauHoi");
    let d = localStorage.getItem("deThi");

    if (m) setMonHoc(JSON.parse(m));
    if (c) setCauHoi(JSON.parse(c));
    if (d) setDeThi(JSON.parse(d));

  }, []);

  useEffect(() => {
    localStorage.setItem("deThi", JSON.stringify(deThi));
  }, [deThi]);

  function taoDe() {

    let danhSach = cauHoi.filter((c) => {
      return c.monHoc === monChon;
    });

    let n = Number(soCau);

    if (danhSach.length < n) {
      alert("Không đủ câu hỏi");
      return;
    }

    let de = [];

    for (let i = 0; i < n; i++) {
      de.push(danhSach[i]);
    }

    let arr = [...deThi];

    arr.push({
      id: Date.now(),
      monHoc: monChon,
      danhSach: de
    });

    setDeThi(arr);
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

      <Input
        placeholder="Số câu hỏi"
        value={soCau}
        onChange={(e) => setSoCau(e.target.value)}
      />

      <br /><br />

      <Button onClick={taoDe}>
        Tạo đề
      </Button>

      <hr />

      {deThi.map((d) => (
        <div key={d.id}>
          <h4>Đề môn {d.monHoc}</h4>

          {d.danhSach.map((c: any) => (
            <p key={c.id}>
              {c.noiDung}
            </p>
          ))}

          <hr />
        </div>
      ))}

    </div>
  );
};

export default TaoDe;