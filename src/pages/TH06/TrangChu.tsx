import { Card, Row, Col } from 'antd';
import { Destination } from './index';

interface Props {
  data: Destination[];
}

export default function TrangChu({ data }: Props) {
  return (
    <Row gutter={[16, 16]}>
      {data.map((d: Destination) => {
        const total = d.foodCost + d.hotelCost + d.transportCost;

        return (
          <Col xs={24} sm={12} md={8} key={d.id}>
            <Card cover={<img src={d.image} />}>
              <h3>{d.name}</h3>
              <p>Giá: {total}</p>
              <p>Rating: {d.rating || 0} / 5</p>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}