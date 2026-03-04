import React, { useState } from "react";
import { Card, InputNumber, Button, Typography, Space, message } from "antd";

const { Title, Text } = Typography;

const GuessGame: React.FC = () => {
  const generateRandom = () => Math.floor(Math.random() * 100) + 1;

  const [secretNumber, setSecretNumber] = useState<number>(generateRandom());
  const [guess, setGuess] = useState<number | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [attemptsLeft, setAttemptsLeft] = useState<number>(10);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleGuess = () => {
    if (guess === null) {
      message.warning("Vui lòng nhập số!");
      return;
    }

    if (gameOver) return;

    if (guess < secretNumber) {
      setMessageText("Bạn đoán quá thấp!");
    } else if (guess > secretNumber) {
      setMessageText("Bạn đoán quá cao!");
    } else {
      setMessageText("🎉 Chúc mừng! Bạn đã đoán đúng!");
      setGameOver(true);
      return;
    }

    const newAttempts = attemptsLeft - 1;
    setAttemptsLeft(newAttempts);

    if (newAttempts === 0) {
      setMessageText(`Bạn đã hết lượt! Số đúng là ${secretNumber}`);
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setSecretNumber(generateRandom());
    setGuess(null);
    setMessageText("");
    setAttemptsLeft(10);
    setGameOver(false);
  };

  return (
    <Card style={{ maxWidth: 500, margin: "50px auto", textAlign: "center" }}>
      <Title level={2}>🎯 Trò chơi đoán số</Title>

      <Space direction="vertical" size="large">
        <Text>Nhập số từ 1 đến 100</Text>

        <InputNumber
          min={1}
          max={100}
          value={guess}
          onChange={(value) => setGuess(value)}
        />

        <Button type="primary" onClick={handleGuess} disabled={gameOver}>
          Đoán
        </Button>

        <Text strong>Số lượt còn lại: {attemptsLeft}</Text>

        <Text>{messageText}</Text>

        {gameOver && (
          <Button onClick={resetGame}>
            Chơi lại
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default GuessGame;