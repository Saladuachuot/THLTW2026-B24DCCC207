import { useState, useEffect } from "react";
import { Input, Button } from "antd";

const MonHoc = () => {

  const [mon, setMon] = useState<any[]>([]);
  const [maMon, setMaMon] = useState("");
  const [tenMon, setTenMon] = useState("");
  const [soTinChi, setSoTinChi] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("monHoc");
    if (data) setMon(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("monHoc", JSON.stringify(mon));
  }, [mon]);

  function themMon() {

    let arr = [...mon];

    arr.push({
      id: Date.now(),
      maMon: maMon,
      tenMon: tenMon,
      soTinChi: soTinChi
    });

    setMon(arr);

    setMaMon("");
    setTenMon("");
    setSoTinChi("");
  }

  return (
    <div>

      <Input
        placeholder="Mã môn"
        value={maMon}
        onChange={(e) => setMaMon(e.target.value)}
      />

      <br /><br />

      <Input
        placeholder="Tên môn"
        value={tenMon}
        onChange={(e) => setTenMon(e.target.value)}
      />

      <br /><br />

      <Input
        placeholder="Số tín chỉ"
        value={soTinChi}
        onChange={(e) => setSoTinChi(e.target.value)}
      />

      <br /><br />

      <Button onClick={themMon}>
        Thêm
      </Button>

      <hr />

      {mon.map((m) => (
        <p key={m.id}>
          {m.maMon} - {m.tenMon}
        </p>
      ))}

    </div>
  );
};

export default MonHoc;