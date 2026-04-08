import { Alert } from 'antd';
import { Destination, PlanItem } from './index';

interface Props {
  plan: PlanItem[];
  destinations: Destination[];
}

export default function NganSach({ plan, destinations }: Props) {

  const food = plan.reduce((s: number, p: PlanItem) => {
    const d = destinations.find(x => x.id === p.destinationId);
    return s + (d?.foodCost || 0);
  }, 0);

  const hotel = plan.reduce((s: number, p: PlanItem) => {
    const d = destinations.find(x => x.id === p.destinationId);
    return s + (d?.hotelCost || 0);
  }, 0);

  const transport = plan.reduce((s: number, p: PlanItem) => {
    const d = destinations.find(x => x.id === p.destinationId);
    return s + (d?.transportCost || 0);
  }, 0);

  const total = food + hotel + transport;

  const foodPercent = total ? (food / total) * 100 : 0;
  const hotelPercent = total ? (hotel / total) * 100 : 0;
  const transportPercent = total ? (transport / total) * 100 : 0;

  return (
    <>
      <h2>Ngân sách</h2>

      <p>Ăn: {food}</p>
      <p>Ở: {hotel}</p>
      <p>Di chuyển: {transport}</p>
      <p>Tổng: {total}</p>

      {total > 5000 && (
        <Alert message="Vượt ngân sách!" type="error" />
      )}

      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `conic-gradient(
            red 0% ${foodPercent}%,
            blue ${foodPercent}% ${foodPercent + hotelPercent}%,
            green ${foodPercent + hotelPercent}% 100%
          )`,
          marginTop: 20
        }}
      />

      {/* Legend */}
      <div>
        <p>🔴 Ăn uống: {foodPercent.toFixed(1)}%</p>
        <p>🔵 Lưu trú: {hotelPercent.toFixed(1)}%</p>
        <p>🟢 Di chuyển: {transportPercent.toFixed(1)}%</p>
      </div>
    </>
  );
}