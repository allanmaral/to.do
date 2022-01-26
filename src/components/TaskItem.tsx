import React, { useCallback, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Task } from "./TasksList";
import { ItemWrapper } from "./ItemWrapper";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import closeIcon from "../assets/icons/close/close.png";

export interface TaskItemProps {
  task: Task;
  index: number;
  isEditing: boolean;
  onEditingStart: () => void;
  onEditingStop: () => void;
  onEdit: (editedTask: Task) => void;
  onToggle: () => void;
  onRemove: () => void;
}

export function TaskItem({
  task,
  index,
  isEditing,
  onToggle,
  onRemove,
  onEdit,
  onEditingStart,
  onEditingStop,
}: TaskItemProps) {
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEditingStart = useCallback(() => {
    setEditedTitle(task.title);
    onEditingStart();
  }, [onEditingStart]);

  const handleEditingCancel = useCallback(() => {
    onEditingStop();
  }, [onEditingStop]);

  const handleRemove = useCallback(() => {
    onRemove();
  }, [onRemove]);

  const handleToggle = useCallback(() => {
    onToggle();
  }, [onToggle]);

  const handleEdit = useCallback(() => {
    onEdit({ ...task, title: editedTitle });
    onEditingStop();
  }, [task, editedTitle, onEdit, onEditingStop]);

  function inputRefCallback(instance: TextInput) {
    if (instance) {
      instance.focus();
    }
  }

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={handleToggle}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {isEditing ? (
            <TextInput
              ref={inputRefCallback}
              value={editedTitle}
              editable={isEditing}
              style={task.done ? styles.taskTextDone : styles.taskText}
              onChangeText={(text) => setEditedTitle(text)}
              onSubmitEditing={() => handleEdit()}
            />
          ) : (
            <Text style={task.done ? styles.taskTextDone : styles.taskText}>
              {task.title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleEditingCancel}>
            <Image source={closeIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEditingStart}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity testID={`trash-${index}`} onPress={handleRemove}>
          <Image style={isEditing ? styles.taskDeleteEditing : undefined} source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  iconsDivider: {
    marginHorizontal: 12,
    borderLeftWidth: 1,
    borderColor: "#C4C4C4",
  },
  taskDeleteEditing: {
    opacity: 0.2,
  },
});
