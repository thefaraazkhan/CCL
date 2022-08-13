import { regeneratorRuntime } from "regenerator-runtime";
import { useEffect, useState } from 'react'
import EditTodo from './EditTodo';
import InputTodo from './InputTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    // const [darkMode, setDarkMode] = useState(false);

    const addTodoHandler = (newTodo) => {
        setTodos([...todos, newTodo]);
    }

    const updateDescriptionHandler = (todo_id, editedText) => {
        let editedTodo = todos.map((todo) =>
            todo.todo_id === todo_id ? { ...todo, description: editedText } : todo
        )
        setTodos(editedTodo);

    };

    const toggleTodoHandler = async (todo_id) => {
        try {
            const updatedTodos = todos.map((todo) =>
                todo.todo_id === todo_id ? { ...todo, completed: !todo.completed } : todo
            );
            setTodos(updatedTodos);

            const updatedTodo = updatedTodos.find((t) => t.todo_id === todo_id);
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            await fetch(`${backendUrl}/todos/${todo_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: updatedTodo.completed }),
            });
        } catch (err) {
            console.error(err.message);
        }
    };

    //Delete Todo function
    const deleteTodoHandler = async (todo_id) => {
        try {
            const deleteTodos = todos.filter((todo) => todo.todo_id === todo_id);

            const updatedTodos = todos.filter((todo) => todo.todo_id !== todo_id);
            setTodos(updatedTodos);

            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            // console.log(`Backend URL DELETE: ${backendUrl}/todos/${id}`);
            await fetch(`${backendUrl}/todos/${todo_id}`, {
                method: "DELETE",
            });
            console.log(`Deleted: ${deleteTodos[0].description}`);
        } catch (err) {
            console.error(err.message);
        }
    }


    const getTodos = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${backendUrl}/todos`);
            const jsonData = await response.json();
            setTodos(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        // Fetch and set initial todos from the backend
        getTodos();

    }, []);

    // const toggleDarkMode = () => {
    //     setDarkMode((prevMode) => !prevMode);
    // };


    return (
        // <div className={`container${darkMode ? ' dark-mode' : ''}`} style={{ minHeight: '100vh' }}>
        <div className="container" style={{ minHeight: '100vh' }}>
            <h1 className="text-center mt-5">Todo List using PostgreSQL (PERN)</h1>
            {/* <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                    Dark Mode
                </label>
            </div> */}

            <InputTodo addTodoHandler={addTodoHandler} />
            <table className="table mt-5 text-center" >
                <thead>
                    <tr >
                        <th>Description</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td
                                style={{
                                    textDecoration: JSON.parse(todo.completed) ? 'line-through' : 'none',
                                    color: JSON.parse(todo.completed) ? '#8C3333' : '#331D2C',
                                }}
                            >
                                {todo.description}
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => toggleTodoHandler(todo.todo_id)}
                                >
                                    {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                                </button>
                            </td>
                            <td>
                                <EditTodo
                                    todo_id={todo.todo_id}
                                    description={todo.description}
                                    updateDescriptionHandler={updateDescriptionHandler}
                                    getTodos={getTodos}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodoHandler(todo.todo_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default ListTodos;
