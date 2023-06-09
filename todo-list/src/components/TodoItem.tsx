import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoItem = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((item) => (item.id === id ? { ...item, todo: editTodo } : item))
    );
    setEdit(false);
  };
  const editRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    editRef.current?.focus();
  }, [edit]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`todos_item ${snapshot.isDragging && "drag"}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
        >
          {edit ? (
            <input
              ref={editRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos_item-text"
            />
          ) : todo.isDone ? (
            <s className="todos_item-text">{todo.todo}</s>
          ) : (
            <span className="todos_item-text">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
