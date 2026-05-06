import React from 'react';
import { Row, Col } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const columns = [
  { key: 'todo', title: 'Cần làm' },
  { key: 'doing', title: 'Đang làm' },
  { key: 'done', title: 'Hoàn thành' },
];

const TaskItem = React.memo(({ task, provided }: any) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={{
      ...provided.draggableProps.style,
      padding: 8,
      background: '#fff',
      borderRadius: 6,
      marginBottom: 8,
      transition: 'transform 0.1s linear'
    }}
  >
    {task.name}
  </div>
));

const Column = React.memo(({ col, tasks }: any) => (
  <Col span={8}>
    <h3>{col.title}</h3>

    <Droppable droppableId={col.key}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            minHeight: 300,
            background: '#f5f5f5',
            padding: 10
          }}
        >
          {tasks.map((t: any, index: number) => (
            <Draggable key={t.id} draggableId={t.id.toString()} index={index}>
              {(prov) => <TaskItem task={t} provided={prov} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </Col>
));

export default ({ tasks, setTasks }: any) => {

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    setTasks((prev: any[]) => {
      const sourceList = prev.filter(t => t.status === source.droppableId);
      const destList = prev.filter(t => t.status === destination.droppableId);

      const [moved] = sourceList.splice(source.index, 1);
      moved.status = destination.droppableId;

      destList.splice(destination.index, 0, moved);

      const others = prev.filter(
        t => t.status !== source.droppableId && t.status !== destination.droppableId
      );

      return [...others, ...sourceList, ...destList];
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={16}>
        {columns.map(col => (
          <Column
            key={col.key}
            col={col}
            tasks={tasks.filter((t: any) => t.status === col.key)}
          />
        ))}
      </Row>
    </DragDropContext>
  );
};