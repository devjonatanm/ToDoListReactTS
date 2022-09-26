import { ChangeEvent, useEffect, useState } from 'react';
import Card from './components/Card';
import './App.css';

/* const todos = [
  {
    id: Math.random(),
    title: 'Fazer café',
    completed: false,
  },
  {
    id: Math.random(),
    title: 'ir para a academia',
    completed: true,
  },
]; */

/* setTimeout(() => {
  todos[0].title = 'Fazer cafe com leite';
}, 5000); */

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('@codersList:todos');

    if (storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });

  //SALVANDO NO LOCALSTORAGE AUTOMATICAMENTE
  useEffect(() => {
    localStorage.setItem('@codersList:todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    //...todos,{ id: Math.random(), title: todoInput, completed: false },
    setTodos((previousTodos) => [
      ...previousTodos,
      { id: Math.random(), title: todoInput, completed: false },
    ]);

    setTodoInput('');
  }

  function completeTodo(id: number) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed }
      )
    );
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }

  function deleteTodo(id: number) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <div className="add-todo">
        <input
          placeholder="Digite aqui o item a ser adicionado a este To-Do List"
          value={todoInput}
          onChange={handleInputChange}
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      {todos.map((todo) => (
        <Card
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default App;
