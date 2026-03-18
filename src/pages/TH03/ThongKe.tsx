import { useEffect, useState } from "react";
import { Card } from "antd";

export default function ThongKe() {
  const [thang, setThang] = useState<any>({});
  const [dv, setDv] = useState<any>({});
  const [nv, setNv] = useState<any>({});

  useEffect(() => {
    const lh = JSON.parse(localStorage.getItem("lichhen") || "[]");
    const dvList = JSON.parse(localStorage.getItem("dichvu") || "[]");

    const done = lh.filter((i: any) => i.status === "Hoàn thành");

    let t1: any = {};
    let t2: any = {};
    let t3: any = {};

    done.forEach((i: any) => {
      const m = i.date?.slice(0, 7);
      if (!t1[m]) t1[m] = 0;
      t1[m]++;

      const dvObj = dvList.find((d: any) => d.name === i.dichVu);
      if (!dvObj) return;

      if (!t2[i.dichVu]) t2[i.dichVu] = 0;
      t2[i.dichVu] += dvObj.price;

      if (!t3[i.nhanVien]) t3[i.nhanVien] = 0;
      t3[i.nhanVien] += dvObj.price;
    });

    setThang(t1);
    setDv(t2);
    setNv(t3);
  }, []);

  return (
    <Card title="Thống kê">
      <h4>Theo tháng</h4>
      {Object.keys(thang).map((i) => (
        <p key={i}>{i}: {thang[i]}</p>
      ))}

      <h4>Doanh thu dịch vụ</h4>
      {Object.keys(dv).map((i) => (
        <p key={i}>{i}: {dv[i]}</p>
      ))}

      <h4>Doanh thu nhân viên</h4>
      {Object.keys(nv).map((i) => (
        <p key={i}>{i}: {nv[i]}</p>
      ))}
    </Card>
  );
}