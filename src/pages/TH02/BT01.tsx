
import React, { useState } from "react";
import { Card, Button, Typography } from "antd";

const OanTuTi = () => {
  const choices = ["Kéo", "Búa", "Bao"];
  const [comChoice, setComChoice] = useState("");
  const [ketQua, setKetQua] = useState("");
  const [lichSu, setLichSu] = useState<any[]>([]);
  function game(myChoice: string) {
    let random = Math.floor(Math.random() * 3);
    let mayChon = choices[random];
    setComChoice(mayChon);
    let ketQuaTran = "";

    if (myChoice === mayChon) {
      ketQuaTran = "Hòa";
    }
    else if (myChoice === "Kéo" && mayChon === "Bao") {
      ketQuaTran = "Bạn thắng";
    }
    else if (myChoice === "Búa" && mayChon === "Kéo") {
      ketQuaTran = "Bạn thắng";
    }
    else if (myChoice === "Bao" && mayChon === "Búa") {
      ketQuaTran = "Bạn thắng";
    }
    else {
      ketQuaTran = "Bạn thua";
    }

    setKetQua(ketQuaTran);
    let banGhi = {
      nguoiChoi: myChoice,
      may: mayChon,
      ketQua: ketQuaTran
    };
    let danhSach = [...lichSu];
    danhSach.unshift(banGhi);
    setLichSu(danhSach);
  }

  return (
    <Card style={{ width: 500, margin: "40px auto" }}>
      <Typography.Title level={2}>
        Trò chơi Oẳn Tù Tì
      </Typography.Title>

      <p>Chọn một trong ba:</p>
      <Button onClick={() => game("Kéo")}>Kéo</Button>
      <Button onClick={() => game("Búa")} style={{ marginLeft: 10 }}>Búa</Button>
      <Button onClick={() => game("Bao")} style={{ marginLeft: 10 }}>Bao</Button>

      <hr />
      <p>Máy chọn: {comChoice}</p>
      <p>Kết quả: {ketQua}</p>
      <hr />
      <h3>Lịch sử trận đấu</h3>

      {lichSu.map((item, index) => (
        <p key={index}>
          Bạn: {item.nguoiChoi} | Máy: {item.may} | {item.ketQua}
        </p>
      ))}
    </Card>
  );
};

export default OanTuTi;