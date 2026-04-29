import { Card, Row, Col, Timeline } from 'antd';
import dayjs from 'dayjs';

export default ({ workouts, goals }: any) => {
  const total = workouts.length;
  const calories = workouts.reduce((s: number, w: any) => s + Number(w.calo || 0), 0);

  const sorted = [...workouts].sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
  const recent = sorted.slice(0, 5);

  return (
    <>
      <Row gutter={16}>
        <Col span={6}><Card>Tổng buổi: {total}</Card></Col>
        <Col span={6}><Card>Calo: {calories}</Card></Col>
        <Col span={6}><Card>Goals: {goals.length}</Card></Col>
        <Col span={6}><Card>Tiến độ: {goals.length ? '50%' : '0%'}</Card></Col>
      </Row>

      <Timeline>
        {recent.map((r: any) => (
          <Timeline.Item key={r.id}>
            {dayjs(r.date).format('DD-MM')} - {r.type}
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};