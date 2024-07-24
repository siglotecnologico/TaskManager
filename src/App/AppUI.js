import React from 'react'
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TooItem } from "../TooItem";
import { CreateTodoButton } from "../CreateTodoButtom";
import { TodosLoading } from "../TodosLoading";
import { TodosError } from "../TodosError";
import { EmptyTodos } from "../EmptyTodos";
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import {TodoForm} from '../TodoForm';

function AppUI() {

    const {
        loading,
        error,
        todoSearchTodos,
        completeTodo,
        deleteTodo,
        openModal} = React.useContext(TodoContext);
    return (
        <>
            <TodoCounter />
            <TodoSearch />

            <TodoList>
                {loading && (
                    <>
                        <TodosLoading />
                    </>
                )}
                {error && <TodosError />}
                {(!loading && todoSearchTodos.length === 0) && <EmptyTodos />}
                {todoSearchTodos.map(todo => (
                    <TooItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                    />
                ))}
            </TodoList>

            <CreateTodoButton />
            {openModal &&(
                <Modal>
                    <TodoForm/>
                </Modal>
            )}
        </>
    )
}
export { AppUI };