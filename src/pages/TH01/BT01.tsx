import React, { useState } from "react";
import { Card, InputNumber, Button, Typography } from "antd";

const GuessGame = () => {

  // hàm tạo số ngẫu nhiên
  function taoSoNgauNhien() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const [secretNumber, setSecretNumber] = useState(taoSoNgauNhien());
  const [myGuess, setMyGuess] = useState<number | null>(null);
  const [thongBao, setThongBao] = useState("");
  const [soLuotConLai, setSoLuotConLai] = useState(10);
  const [ketThuc, setKetThuc] = useState(false);

  function handleGuess() {

    if (myGuess === null) {
      setThongBao("Bạn chưa nhập số!");
      return;
    }

    if (ketThuc === true) {
      return;
    }

    if (myGuess < secretNumber) {
      setThongBao("Bạn đoán quá thấp!");
    }

    if (myGuess > secretNumber) {
      setThongBao("Bạn đoán quá cao!");
    }

    if (myGuess === secretNumber) {
      setThongBao("Chúc mừng! Bạn đã đoán đúng!");
      setKetThuc(true);
    }

    let luotMoi = soLuotConLai - 1;
    setSoLuotConLai(luotMoi);

    if (luotMoi === 0 && myGuess !== secretNumber) {
      setThongBao("Bạn đã hết lượt! Số đúng là " + secretNumber);
      setKetThuc(true);
    }
  }

  function choiLai() {
    let soMoi = taoSoNgauNhien();
    setSecretNumber(soMoi);
    setMyGuess(null);
    setThongBao("");
    setSoLuotConLai(10);
    setKetThuc(false);
  }

  return (
    <Card style={{ width: 400, margin: "50px auto" }}>
      <Typography.Title level={2}>
        Trò chơi đoán số
      </Typography.Title>

      <p>Nhập số từ 1 đến 100</p>

      <InputNumber
        min={1}
        max={100}
        value={myGuess}
        onChange={(value) => {
          setMyGuess(value);
        }}
      />

      <br /><br />

      <Button type="primary" onClick={handleGuess} disabled={ketThuc}>
        Đoán
      </Button>

      <p>Số lượt còn lại: {soLuotConLai}</p>

      <p>{thongBao}</p>

      {ketThuc === true && (
        <Button onClick={choiLai}>
          Chơi lại
        </Button>
      )}
    </Card>
  );
};

export default GuessGame;
