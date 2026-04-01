import { Card } from 'antd';
import { Column } from '@ant-design/plots';

export default ({ clubs, applications }) => {
  const data = [];

  clubs.forEach(c => {
    ['Pending', 'Approved', 'Rejected'].forEach(status => {
      data.push({
        club: c.name,
        type: status,
        value: applications.filter(a => a.clubId === c.id && a.status === status).length
      });
    });
  });

  return (
    <Card>
      <p>Số CLB: {clubs.length}</p>

      <Column
        data={data}
        xField="club"
        yField="value"
        seriesField="type"
      />
    </Card>
  );
};