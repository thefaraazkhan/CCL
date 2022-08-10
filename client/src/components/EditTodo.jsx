import { useState } from "react";

function EditTodo({ todo_id, description, updateDescriptionHandler }) {
    const [editedText, setEditedText] = useState(description);

    //Edit function 
    const onUpdateHandler = async e => {
        e.preventDefault();
        try {
            // const body = { description };
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            console.log(todo_id)
            await fetch(`${backendUrl}/todos/${todo_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: editedText }),
            });
            updateDescriptionHandler(todo_id, editedText);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#id${todo_id}`}
                onClick={() => setEditedText(description)}
            >
                Edit
            </button>

            <div
                className="modal fade"
                id={`id${todo_id}`}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                onClick={() => setEditedText(description)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit Todo
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setEditedText(description)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={onUpdateHandler}
                                data-bs-dismiss="modal"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => setEditedText(description)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTodo;
