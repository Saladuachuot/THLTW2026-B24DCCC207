import { Table, Button, Space, Popconfirm, Input, Select, Tag } from 'antd';
import { useState } from 'react';
import PostForm from './PostForm';

export default ({ posts, setPosts, tags }: any) => {
  const [editing, setEditing] = useState<any>(null);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');

  const filtered = posts.filter((p: any) => {
    if (keyword && !p.title.toLowerCase().includes(keyword.toLowerCase())) return false;
    if (status && p.status !== status) return false;
    return true;
  });

  return (
    <>
      <PostForm posts={posts} setPosts={setPosts} editing={editing} setEditing={setEditing} tags={tags} />

      <Input placeholder="Search..." onChange={e => setKeyword(e.target.value)} />
      <Select placeholder="Trạng thái" onChange={setStatus} allowClear
        options={[{ value: 'Nháp' }, { value: 'Đã đăng' }]}
      />

      <Table
        rowKey="id"
        dataSource={filtered}
        columns={[
          { title: 'Tiêu đề', dataIndex: 'title' },
          { title: 'Trạng thái', dataIndex: 'status' },
          {
            title: 'Tags',
            render: (r: any) => r.tags.map((t: string) => <Tag key={t}>{t}</Tag>)
          },
          { title: 'Views', dataIndex: 'views' },
          { title: 'Ngày', dataIndex: 'createdAt' },
          {
            title: 'Thao tác',
            render: (r: any) => (
              <Space>
                <Button onClick={() => setEditing(r)}>Sửa</Button>
                <Popconfirm title="Xóa?" onConfirm={() => setPosts(posts.filter((p: any) => p.id !== r.id))}>
                  <Button danger>Xóa</Button>
                </Popconfirm>
              </Space>
            )
          }
        ]}
      />
    </>
  );
};