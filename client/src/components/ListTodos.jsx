import { useEffect, useState } from 'react'
import EditTodo from './EditTodo';
import InputTodo from './InputTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);


    const addTodoHandler = (newTodo) => {
        setTodos([...todos, newTodo]);
    }

    const updateDescriptionHandler = (todo_id, editedText) => {
        getTodos();
        let editedTodo = todos.map((todo) =>
            todo.todo_id === todo_id ? { ...todo, description: editedText } : todo
        )
        setTodos(editedTodo);

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
        getTodos();
    }, [])

    // console.log(todos);
    return (
        <div>
            <h1 className="text-center mt-5">Todo List using PostgreSQL (PERN)</h1>
            <InputTodo addTodoHandler={addTodoHandler} />

            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo
                                    todo_id={todo.todo_id}
                                    description={todo.description}
                                    updateDescriptionHandler={updateDescriptionHandler}
                                    todos={todos}
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
    )
}

export default ListTodos