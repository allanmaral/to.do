import React, { useCallback } from "react";
import { FlatList } from "react-native";

import { TaskItem } from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask
}: TasksListProps) {
  const handleToggleTaskDone = useCallback(
    (task: Task) => {
      toggleTaskDone(task.id);
    },
    [toggleTaskDone]
  );

  const handleRemoveTask = useCallback(
    (task: Task) => {
      removeTask(task.id);
    },
    [removeTask]
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskItem
            task={item}
            index={index}
            onToggle={() => handleToggleTaskDone(item)}
            onRemove={() => handleRemoveTask(item)}
          />
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
