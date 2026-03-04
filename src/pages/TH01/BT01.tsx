import React, { useState } from "react";
import { Card, InputNumber, Button, Typography } from "antd";

const GuessGame = () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const [secretNumber, setSecretNumber] = useState(randomNumber);
  const [guess, setGuess] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  function handleGuess() {
    if (guess === null) {
      setMessageText("Bạn chưa nhập số!");
      return;
    }
    if (gameOver === true) {
      return;
    }
    if (guess < secretNumber) {
      setMessageText("Bạn đoán quá thấp!");
    }
    if (guess > secretNumber) {
      setMessageText("Bạn đoán quá cao!");
    }
    if (guess === secretNumber) {
      setMessageText("Chúc mừng! Bạn đã đoán đúng!");
      setGameOver(true);
    }

    let newAttempts = attemptsLeft - 1;
    setAttemptsLeft(newAttempts);
    if (newAttempts === 0 && guess !== secretNumber) {
      setMessageText("Bạn đã hết lượt! Số đúng là " + secretNumber);
      setGameOver(true);
    }
  }

  function resetGame() {
    let newRandom = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(newRandom);
    setGuess(null);
    setMessageText("");
    setAttemptsLeft(10);
    setGameOver(false);
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
        value={guess}
        onChange={(value) => {
          setGuess(value);
        }}
      />

      <br /><br />
      <Button type="primary" onClick={handleGuess} disabled={gameOver}>
        Đoán
      </Button>

      <p>Số lượt còn lại: {attemptsLeft}</p>
      <p>{messageText}</p>
      {gameOver === true && (
        <Button onClick={resetGame}>
          Chơi lại
        </Button>
      )}
    </Card>
  );
};

export default GuessGame;