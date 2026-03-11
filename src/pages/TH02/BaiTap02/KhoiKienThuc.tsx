import { useState, useEffect } from "react";
import { Input, Button } from "antd";

const KhoiKienThuc = () => {

  const [khoi, setKhoi] = useState<any[]>([]);
  const [tenKhoi, setTenKhoi] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("khoiKienThuc");
    if (data) setKhoi(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("khoiKienThuc", JSON.stringify(khoi));
  }, [khoi]);

  function themKhoi() {

    if (tenKhoi === "") return;

    let arr = [...khoi];

    arr.push({
      id: Date.now(),
      ten: tenKhoi
    });

    setKhoi(arr);
    setTenKhoi("");
  }

  return (
    <div>

      <Input
        placeholder="Tên khối kiến thức"
        value={tenKhoi}
        onChange={(e) => setTenKhoi(e.target.value)}
      />

      <br /><br />

      <Button onClick={themKhoi}>
        Thêm
      </Button>

      <hr />

      {khoi.map((k) => (
        <p key={k.id}>{k.ten}</p>
      ))}

    </div>
  );
};

export default KhoiKienThuc;