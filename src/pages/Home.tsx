import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const lowerCaseTitle = newTaskTitle.toLocaleLowerCase()
    const taskAlreadyExists = !!tasks.find(task => task.title.toLocaleLowerCase() === lowerCaseTitle)

    if (taskAlreadyExists) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks((oldTasks) => [...oldTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    setTasks((oldTasks) => oldTasks.map((task) => {
      if (task.id === id) {
        return {...task, done: !task.done}
      }
      return task
    }))
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: () => {
            setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
          },
          style: 'destructive'
        },
      ]
    );
  }

  function handleEditTask(id: number, newTitle: string) {
    setTasks((oldTasks) =>
      oldTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title: newTitle };
        }
        return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})