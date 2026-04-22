import { Card, Input, Tag, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default ({ posts, onSelect }: any) => {
  const [keyword, setKeyword] = useState('');
  const [debounce, setDebounce] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);

  // debounce 300ms
  useEffect(() => {
    const t = setTimeout(() => setDebounce(keyword), 300);
    return () => clearTimeout(t);
  }, [keyword]);

  const filtered = posts.filter((p: any) => {
    if (p.status !== 'Đã đăng') return false;
    if (debounce && !p.title.toLowerCase().includes(debounce.toLowerCase())) return false;
    if (tag && !p.tags.includes(tag)) return false;
    return true;
  });

  const pageData = filtered.slice((page - 1) * 9, page * 9);

  return (
    <>
      <Input placeholder="Tìm kiếm..." onChange={e => setKeyword(e.target.value)} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {pageData.map((p: any) => (
          <Card key={p.id} style={{ width: 300 }} onClick={() => onSelect(p)}>
            <img src={p.thumbnail} style={{ width: '100%' }} />
            <h3>{p.title}</h3>
            <p>{p.content.slice(0, 80)}...</p>
            <p>{dayjs(p.createdAt).format('DD-MM-YYYY')}</p>

            {p.tags.map((t: string) => (
              <Tag key={t} onClick={(e) => { e.stopPropagation(); setTag(t); }}>
                {t}
              </Tag>
            ))}
          </Card>
        ))}
      </div>

      <Pagination pageSize={9} total={filtered.length} onChange={setPage} />
    </>
  );
};