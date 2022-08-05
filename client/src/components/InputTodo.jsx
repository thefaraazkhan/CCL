import { useState } from "react";

function InputTodo() {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1 className="text-center mt-5">Todo List using PostgreSQL (PERN)</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></input>
                <button className="btn btn-success mx-1">Add</button>
            </form>
        </div>
    );
}

export default InputTodo;
