import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from './store/todo.model';
import { addTodo, removeTodo, updateTodo } from './store/todo.actions';
import { selectAllTodos } from './store/todo.selectors';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, StoreModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PrvaAplikacija';
  todoList$: Observable<Todo[]>; 
  todoInput: string = ''; 
  editingTodoId: string | null = null; 
  editingTodoTitle: string = ''; 

  constructor(private store: Store) {
    this.todoList$ = this.store.select(selectAllTodos);
  }

  ngOnInit() {
    this.todoList$.subscribe((todos) => {
      console.log('Trenutni todosi:', todos);
    });
  }

  // Create - Dodaj nalogo
  addTodo() {
    if (this.todoInput.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: this.todoInput.trim(),
      };

      this.store.dispatch(addTodo({ todo: newTodo }));
      this.todoInput = ''; 
    }
  }

  // Read - Prikaz vseh nalog
  // To že omogoča `todoList$`, ki uporablja selector `selectAllTodos`.

  // Update - Začetek urejanja naloge
  startEditing(todo: Todo) {
    this.editingTodoId = todo.id;
    this.editingTodoTitle = todo.title;
  }

  // Update - Shrani urejeno nalogo
  saveEditedTodo() {
    if (this.editingTodoId && this.editingTodoTitle.trim()) {
      const updatedTodo: Todo = {
        id: this.editingTodoId,
        title: this.editingTodoTitle.trim(),
      };

      this.store.dispatch(updateTodo({ todo: updatedTodo }));

      this.editingTodoId = null; 
      this.editingTodoTitle = ''; 
    }
  }

  // Update - Preklic urejanja naloge
  cancelEditing() {
    this.editingTodoId = null;
    this.editingTodoTitle = '';
  }

  // Delete - Brisanje naloge
  deleteTodo(todoId: string) {
    this.store.dispatch(removeTodo({ id: todoId }));
  }
}
