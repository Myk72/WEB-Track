import React, { useState } from "react";

function ToDoList() {
  interface Props {
    currentTask: string;
    editing: boolean;
  }

  const [task, setTask] = useState<Props[]>([]);

  const [task_input, setInput] = useState("");

  const [isEditing, setBeingEdited] = useState("");
  const [updatedTask, setUpdatedTask] = useState("");

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      {
        addTask();
      }
    }
  };

  function addTask() {
    if (task_input !== "") {
      setTask((task) => [
        ...task,
        {
          currentTask: task_input,
          editing: false,
        },
      ]);
      setInput("");
    } else {
      alert("Please Enter Task");
    }
  }
  function deleteTask(idx: number) {
    if (idx !== -1) {
      task.splice(idx, 1);
      setTask([...task]);
    }
  }

  function updateTask(idx: number) {
    if (task[idx].editing) {
      task[idx].currentTask = updatedTask;
    }
    task[idx].editing = false;
  }

  function editTask(idx: number, val: string) {
    if (isEditing && !task[idx].editing) {
      task[Number(isEditing)].editing = false;
    }
    if (isEditing === idx.toString()) {
      updateTask(idx);
      console.log(task[idx], "111");
      setBeingEdited("");
      setUpdatedTask("");
    } else {
      console.log(task[idx], "222");
      setUpdatedTask(val);
      task[idx].editing = !task[idx].editing;
      setBeingEdited(idx.toString());
    }
  }

  return (
    <div className="to-do-list">
      <h1 style={{ textAlign: "center", marginBottom: "15px" }}>TO-DO List </h1>
      <div className="inp">
        <input
          className="input_sec"
          placeholder="Add Task ..."
          value={task_input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <button type="submit" className="add" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="display_section">
        {task.map((task, index) => (
          <li key={index} className="eachDis">
            {task.currentTask.length > 0 && (
              <input
                className="text"
                value={
                  isEditing == index.toString() ? updatedTask : task.currentTask
                }
                readOnly={isEditing !== index.toString()}
                onChange={(e) => setUpdatedTask(e.target.value)}
                style={{
                  outline: isEditing === index.toString() ? "solid" : "none",
                  outlineColor:
                    isEditing === index.toString() ? "aqua" : "black",
                }}
              />
            )}
            {task.currentTask.length > 0 && (
              <button
                className="edit_button"
                onClick={() => editTask(index, task.currentTask)}
              >
                {isEditing != index.toString() ? "Edit" : "Save"}
              </button>
            )}
            {task.currentTask.length > 0 && (
              <button className="del_button" onClick={() => deleteTask(index)}>
                ❌
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
