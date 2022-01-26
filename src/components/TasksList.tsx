import React, { useCallback, useState } from "react";
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
  editTask: (id: number, title: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask
}: TasksListProps) {
  const [editingId, setEditingId] = useState<number | undefined>(undefined)

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

  const handleEditingStart = useCallback(
    (task: Task) => {
      setEditingId(task.id)
    }, 
    []
  )

  const handleEditingStop = useCallback(
    () => {
      setEditingId(undefined)
    }, 
    []
  )

  const handleEditTask = useCallback(
    (editedTask: Task) => {
      editTask(editedTask.id, editedTask.title)
    }, 
    [editTask]
  )

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
            isEditing={editingId === item.id}
            onToggle={() => handleToggleTaskDone(item)}
            onRemove={() => handleRemoveTask(item)}
            onEdit={(item) => handleEditTask(item)}
            onEditingStart={() => handleEditingStart(item)}
            onEditingStop={() => handleEditingStop()}
          />
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
