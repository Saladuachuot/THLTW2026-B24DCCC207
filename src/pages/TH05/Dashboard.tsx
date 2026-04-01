import { Card, Row, Col } from 'antd';

export default ({ clubs, applications }) => {
  const pending = applications.filter(a => a.status === 'Pending').length;
  const approved = applications.filter(a => a.status === 'Approved').length;
  const rejected = applications.filter(a => a.status === 'Rejected').length;

  return (
    <div style={{ marginBottom: 16 }}>
      <Card size="small">
        <Row gutter={16}>
          <Col span={6}>CLB: {clubs.length}</Col>
          <Col span={6}>Pending: {pending}</Col>
          <Col span={6}>Approved: {approved}</Col>
          <Col span={6}>Rejected: {rejected}</Col>
        </Row>
      </Card>
    </div>
  );
};