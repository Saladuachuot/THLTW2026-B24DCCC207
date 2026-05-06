import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Kanban from './Kanban';
import TaskTable from './TaskTable';

export default () => {
  const [tasks, setTasks] = useState<any[]>(() => {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Dashboard" key="1">
        <Dashboard tasks={tasks} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Kanban" key="2">
        <Kanban tasks={tasks} setTasks={setTasks} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Danh sách" key="3">
        <TaskTable tasks={tasks} setTasks={setTasks} />
      </Tabs.TabPane>
    </Tabs>
  );
};