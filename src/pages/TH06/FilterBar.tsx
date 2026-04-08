
import { Select, Slider } from 'antd';
import { useState } from 'react';

interface Props {
  setFilter: any;
}

export default function FilterBar({ setFilter }: Props) {
  const [price, setPrice] = useState(5000);
  const [rating, setRating] = useState(0);

  return (
    <div style={{ marginBottom: 20 }}>
      
      <Select
        placeholder="Loại hình"
        style={{ width: 150, marginRight: 10 }}
        onChange={(v) => setFilter((f: any) => ({ ...f, type: v }))}
        options={[
          { value: 'Biển', label: 'Biển' },
          { value: 'Núi', label: 'Núi' },
          { value: 'Thành phố', label: 'Thành phố' }
        ]}
      />
      <div style={{ width: 250, marginBottom: 10 }}>
        <b>Giá cả {price}</b>
        <Slider
          max={5000}
          value={price}
          onChange={(v) => {
            setPrice(v as number);
            setFilter((f: any) => ({ ...f, price: v }));
          }}
        />
      </div>

      <div style={{ width: 250 }}>
        <b>Rating {rating} / 5</b>
        <Slider
          min={0}
          max={5}
          step={0.5}
          value={rating}
          onChange={(v) => {
            setRating(v as number);
            setFilter((f: any) => ({ ...f, rating: v }));
          }}
        />
      </div>

    </div>
  );
}