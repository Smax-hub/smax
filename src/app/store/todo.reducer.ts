import { createReducer, on } from '@ngrx/store';
import { initialTodoState } from './todo.state';
import { addTodo, removeTodo } from './todo.actions';

export const todoReducer = createReducer(
  initialTodoState,
  on(addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }))
);
