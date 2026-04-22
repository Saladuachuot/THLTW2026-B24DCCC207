import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import TrangChu from './TrangChu';
import ChiTiet from './ChiTiet';
import QuanLyBaiViet from './QuanLyBaiViet';
import QuanLyTag from './QuanLyTag';
import GioiThieu from './GioiThieu';

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  tags: string[];
  status: 'Nháp' | 'Đã đăng';
  views: number;
  createdAt: string;
  author: string;
}

export default () => {
  const [posts, setPosts] = useState<Post[]>(() =>
    JSON.parse(localStorage.getItem('posts') || '[]')
  );

  const [tags, setTags] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('tags') || '["React","JS"]')
  );

  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

  return (
    <Tabs>
      <Tabs.TabPane tab="Trang chủ" key="1">
        {selected ? (
          <ChiTiet post={selected} posts={posts} setPosts={setPosts} back={() => setSelected(null)} />
        ) : (
          <TrangChu posts={posts} onSelect={setSelected} />
        )}
      </Tabs.TabPane>

      <Tabs.TabPane tab="Quản lý bài viết" key="2">
        <QuanLyBaiViet posts={posts} setPosts={setPosts} tags={tags} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Quản lý tag" key="3">
        <QuanLyTag tags={tags} setTags={setTags} posts={posts} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Giới thiệu" key="4">
        <GioiThieu />
      </Tabs.TabPane>
    </Tabs>
  );
};