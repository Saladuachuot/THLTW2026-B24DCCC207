import ReactMarkdown from 'react-markdown';
import { Tag, Button } from 'antd';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export default ({ post, posts, setPosts, back }: any) => {

  // tăng view
  useEffect(() => {
    setPosts((prev: any) =>
      prev.map((p: any) =>
        p.id === post.id ? { ...p, views: p.views + 1 } : p
      )
    );
  }, []);

  const related = posts.filter((p: any) =>
    p.id !== post.id &&
    p.tags.some((t: string) => post.tags.includes(t))
  );

  return (
    <>
      <Button onClick={back}>← Quay lại</Button>

      <h1>{post.title}</h1>
      <p>{post.author} - {dayjs(post.createdAt).format('DD-MM-YYYY')}</p>
      <p>👁 {post.views}</p>

      {post.tags.map((t: string) => <Tag key={t}>{t}</Tag>)}

      <ReactMarkdown>{post.content}</ReactMarkdown>

      <h3>Bài liên quan</h3>
      {related.map((r: any) => (
        <div key={r.id}>{r.title}</div>
      ))}
    </>
  );
};