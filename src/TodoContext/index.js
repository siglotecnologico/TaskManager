import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('TODO_V1', [])

  const [searchValue, setSearchValue] = useState('')
  const [openModal, setOpenModal] = useState(false)
   
  const completedTodo = todos.filter(todo => todo.completed).length;//filtrar para buscar los completados
  const totalTodos = todos.length;

  const todoSearchTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchValueText = searchValue.toLowerCase()
      return todoText.includes(searchValueText)
    });

  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos)
  }

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos)
  }

  const addTodo = (text) =>{
    const newTodos = [...todos];
    newTodos.push({
      text,
      completed: false
    });
    saveTodos(newTodos);
  }
  return (
    <TodoContext.Provider
      value={{
        completedTodo,
        totalTodos,
        searchValue,
        setSearchValue,
        todoSearchTodos,
        deleteTodo,
        completeTodo,
        loading,
        error,
        openModal,
        setOpenModal,
        addTodo
      }}>
      {children}
    </TodoContext.Provider>
  )
}

export { TodoProvider, TodoContext }