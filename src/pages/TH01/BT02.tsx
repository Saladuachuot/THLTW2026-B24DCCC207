import React, { useState, useEffect } from "react";
import { Card, Input, Button, Select } from "antd";

const BT02 = () => {

  const [subjects, setSubjects] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);

  const [newSubject, setNewSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [month, setMonth] = useState("");
  const [targetMinutes, setTargetMinutes] = useState("");

  // load dữ liệu khi mở trang
  useEffect(() => {
    const s1 = localStorage.getItem("subjects");
    const s2 = localStorage.getItem("sessions");
    const s3 = localStorage.getItem("goals");

    if (s1) setSubjects(JSON.parse(s1));
    if (s2) setSessions(JSON.parse(s2));
    if (s3) setGoals(JSON.parse(s3));
  }, []);

  // lưu localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // thêm môn học
  function addSubject() {
    if (newSubject === "") return;

    let arr = [...subjects];
    arr.push({ id: Date.now(), name: newSubject });
    setSubjects(arr);
    setNewSubject("");
  }

  // thêm buổi học
  function addSession() {
    if (selectedSubject === "" || duration === "") return;

    let arr = [...sessions];
    arr.push({
      id: Date.now(),
      subjectId: selectedSubject,
      duration: Number(duration),
      date: new Date().toISOString()
    });

    setSessions(arr);
    setDuration("");
  }

  // đặt mục tiêu
  function addGoal() {
    if (month === "" || targetMinutes === "") return;

    let arr = [...goals];
    arr.push({
      month: month,
      target: Number(targetMinutes)
    });

    setGoals(arr);
    setTargetMinutes("");
  }

  // tính tổng phút theo tháng
  function getTotalByMonth(m: string) {
    let total = 0;

    for (let i = 0; i < sessions.length; i++) {
      let d = sessions[i].date;
      if (d.startsWith(m)) {
        total = total + sessions[i].duration;
      }
    }

    return total;
  }

  return (
    <Card style={{ width: 600, margin: "30px auto" }}>

      <h2>Quản lý học tập</h2>

      <hr />

      <h3>Thêm môn học</h3>
      <Input
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        placeholder="Tên môn"
      />
      <br /><br />
      <Button onClick={addSubject}>Thêm môn</Button>

      <ul>
        {subjects.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>

      <hr />

      <h3>Thêm buổi học</h3>
      <Select
        style={{ width: "100%" }}
        onChange={(value) => setSelectedSubject(value)}
      >
        {subjects.map((s) => (
          <Select.Option key={s.id} value={s.id}>
            {s.name}
          </Select.Option>
        ))}
      </Select>

      <br /><br />

      <Input
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Số phút học"
      />

      <br /><br />
      <Button onClick={addSession}>Thêm buổi học</Button>

      <hr />

      <h3>Đặt mục tiêu tháng</h3>

      <Input
        placeholder="Ví dụ: 2026-03"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <br /><br />

      <Input
        placeholder="Số phút mục tiêu"
        value={targetMinutes}
        onChange={(e) => setTargetMinutes(e.target.value)}
      />

      <br /><br />

      <Button onClick={addGoal}>Đặt mục tiêu</Button>

      <hr />

      <h3>Kết quả</h3>

      {goals.map((g, index) => {
        let total = getTotalByMonth(g.month);
        let done = total >= g.target;

        return (
          <div key={index}>
            <p>
              Tháng {g.month} :
              Tổng học {total} phút /
              Mục tiêu {g.target} phút
            </p>
            <p>
              {done ? "ĐÃ HOÀN THÀNH" : "CHƯA ĐẠT"}
            </p>
            <hr />
          </div>
        );
      })}

    </Card>
  );
};

export default BT02;