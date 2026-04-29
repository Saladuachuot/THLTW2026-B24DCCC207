import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import WorkoutLog from './WorkoutLog';
import HealthLog from './HealthLog';
import Goals from './Goals';
import Exercises from './Exercises';

export default () => {
  const [workouts, setWorkouts] = useState<any[]>(() => JSON.parse(localStorage.getItem('workouts') || '[]'));
  const [health, setHealth] = useState<any[]>(() => JSON.parse(localStorage.getItem('health') || '[]'));
  const [goals, setGoals] = useState<any[]>(() => JSON.parse(localStorage.getItem('goals') || '[]'));
  const [exercises, setExercises] = useState<any[]>(() => JSON.parse(localStorage.getItem('exercises') || '[]'));

  useEffect(() => localStorage.setItem('workouts', JSON.stringify(workouts)), [workouts]);
  useEffect(() => localStorage.setItem('health', JSON.stringify(health)), [health]);
  useEffect(() => localStorage.setItem('goals', JSON.stringify(goals)), [goals]);
  useEffect(() => localStorage.setItem('exercises', JSON.stringify(exercises)), [exercises]);

  return (
    <Tabs destroyInactiveTabPane>
      <Tabs.TabPane tab="Dashboard" key="1">
        <Dashboard workouts={workouts} health={health} goals={goals} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Workout" key="2">
        <WorkoutLog data={workouts} setData={setWorkouts} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Health" key="3">
        <HealthLog data={health} setData={setHealth} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Goals" key="4">
        <Goals data={goals} setData={setGoals} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Exercises" key="5">
        <Exercises data={exercises} setData={setExercises} />
      </Tabs.TabPane>
    </Tabs>
  );
};