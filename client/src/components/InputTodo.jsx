import { useState } from "react";
import { regeneratorRuntime } from "regenerator-runtime";

const InputTodo = ({ addTodoHandler }) => {
    const [todoText, setTodoText] = useState('');

    const onSubmitFormHandler = async e => {
        e.preventDefault();
        if (todoText === "") return;

        try {
            // const completed = false;
            // const body = { description, completed };
            // console.log(body);
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            const response = await fetch(`${backendUrl}/todos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: todoText, completed: false }),
            });
            const data = await response.json();
            addTodoHandler(data); // Update the state in the parent component
            setTodoText(''); // Clear the input field

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <form className="d-flex mt-5" onSubmit={onSubmitFormHandler}>
                <input
                    type="text"
                    placeholder="Enter todo text"
                    className="form-control"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                />
                <button type="submit" className="btn btn-success mx-1">Add Todo</button>
            </form>
        </div>
    );
}

export default InputTodo;
