import { Card, Row, Col } from 'antd';
import dayjs from 'dayjs';

export default ({ tasks }: any) => {
  const total = tasks.length;
  const done = tasks.filter((t: any) => t.status === 'done').length;
  const overdue = tasks.filter(
    (t: any) => dayjs(t.deadline).isBefore(dayjs()) && t.status !== 'done'
  ).length;

  return (
    <Row gutter={16}>
      <Col span={8}><Card>Tổng task: {total}</Card></Col>
      <Col span={8}><Card>Hoàn thành: {done}</Card></Col>
      <Col span={8}><Card>Quá hạn: {overdue}</Card></Col>
    </Row>
  );
};