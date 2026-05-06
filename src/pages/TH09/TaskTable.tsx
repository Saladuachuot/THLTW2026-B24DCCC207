import { Table, Button, Input, Select, Popconfirm, Tag } from 'antd';
import { useState } from 'react';
import TaskForm from './TaskForm';

export default ({ tasks, setTasks }: any) => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const filtered = tasks
    .filter((t: any) => {
      const kw = keyword.toLowerCase();

      const nameMatch = t.name
        ?.toLowerCase()
        .includes(kw);

      const tagMatch = t.tags?.some((tag: string) =>
        tag.toLowerCase().includes(kw)
      );

      return nameMatch || tagMatch;
    })
    .filter((t: any) => !status || t.status === status)
    .sort(
      (a: any, b: any) =>
        new Date(a.deadline).getTime() -
        new Date(b.deadline).getTime()
    );

  return (
    <>
      <Input
        placeholder="Tìm theo tên hoặc tags..."
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Select
        allowClear
        placeholder="Trạng thái"
        onChange={setStatus}
        style={{ width: 200, margin: '10px 0' }}
      >
        <Select.Option value="todo">Cần làm</Select.Option>
        <Select.Option value="doing">Đang làm</Select.Option>
        <Select.Option value="done">Hoàn thành</Select.Option>
      </Select>
      <br />

      <Button
        type="primary"
        onClick={() => {
          setEditing(null);
          setOpen(true);
        }}
      >
        Thêm
      </Button>

      <Table
        rowKey="id"
        dataSource={filtered}
        style={{ marginTop: 12 }}
        columns={[
          {
            title: 'Tên',
            dataIndex: 'name',
          },

          {
            title: 'Mô tả',
            dataIndex: 'description',
            ellipsis: true,
            render: (text: string) =>
              text ? (
                <span title={text}>
                  {text.length > 40
                    ? text.slice(0, 40) + '...'
                    : text}
                </span>
              ) : (
                '-'
              ),
          },

          {
            title: 'Deadline',
            dataIndex: 'deadline',
          },

          {
            title: 'Ưu tiên',
            dataIndex: 'priority',
          },

          {
            title: 'Tags',
            dataIndex: 'tags',
            render: (tags: string[]) =>
              tags?.length ? (
                <>
                  {tags.map((tag, i) => (
                    <Tag color="blue" key={i}>
                      {tag}
                    </Tag>
                  ))}
                </>
              ) : (
                '-'
              ),
          },

          {
            title: 'Trạng thái',
            render: (r: any) => {
              const map: any = {
                todo: 'Cần làm',
                doing: 'Đang làm',
                done: 'Hoàn thành',
              };
              return map[r.status];
            },
          },

          {
            title: 'Thao tác',
            width: 120,
            align: 'center',
            render: (r: any) => (
              <div style={{ display: 'flex', gap: 6 }}>
                <Button
                  size="small"
                  onClick={() => {
                    setEditing(r);
                    setOpen(true);
                  }}
                >
                  Sửa
                </Button>

                <Popconfirm
                  title="Xóa task?"
                  onConfirm={() =>
                    setTasks(
                      tasks.filter((t: any) => t.id !== r.id)
                    )
                  }
                >
                  <Button size="small" danger>
                    Xóa
                  </Button>
                </Popconfirm>
              </div>
            ),
          },
        ]}
      />

      <TaskForm
        open={open}
        setOpen={setOpen}
        editing={editing}
        tasks={tasks}
        setTasks={setTasks}
      />
    </>
  );
};