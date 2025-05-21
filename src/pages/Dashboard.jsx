import { useEffect, useState } from "react";

const Dashboard = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    // State for editing logic
    const [editingId, setEditingId] = useState(null);
    const [editedText, setEditedText] = useState("");

    // Load saved tasks from localStorage on first render
    useEffect(() => {
        const savedTasks = localStorage.getItem("devtasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save to localStorage whenever tasks change
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("devtasks", JSON.stringify(tasks));
        } else {
            localStorage.removeItem("devtasks");
        }
    }, [tasks]);

    const handleAddTask = (event) => {
        event.preventDefault();
        if (task.trim() === "") return;

        const newTask = { id: Date.now(), text: task, completed: false };
        setTasks([...tasks, newTask]);
        setTask("");
    };

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter((item) => item.id !== id);
        setTasks(updatedTasks);
    };

    const handleSaveEdit = (id) => {
        const updatedTasks = tasks.map((t) =>
            t.id === id ? { ...t, text: editedText } : t
        );
        setTasks(updatedTasks);
        setEditingId(null);
        setEditedText("");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Your Tasks</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter your task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="border px-4 py-2 rounded w-full dark:bg-gray-700 dark:text-white"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-primary text-black dark:text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {tasks.map((item) => (
                    <li
                        key={item.id}
                        className={`flex items-center justify-between bg-green-100 dark:bg-gray-700 p-2 rounded ${item.completed
                            ? "line-through text-gray-500 dark:text-gray-400"
                            : ""
                            }`}
                    >
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() =>
                                    setTasks((prev) =>
                                        prev.map((t) =>
                                            t.id === item.id
                                                ? { ...t, completed: !t.completed }
                                                : t
                                        )
                                    )
                                }
                            />

                            {/* Conditional rendering: Edit input or task text */}
                            {editingId === item.id ? (
                                <input
                                    type="text"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    className="px-2 py-1 border rounded w-full dark:bg-gray-800 dark:text-white"
                                />
                            ) : (
                                <span className="w-full">{item.text}</span>
                            )}
                        </div>

                        <div className="flex gap-2 ml-2">
                            {editingId === item.id ? (
                                <>
                                    <button
                                        onClick={() => handleSaveEdit(item.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingId(null);
                                            setEditedText("");
                                        }}
                                        className="text-yellow-500 hover:text-yellow-700"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        setEditingId(item.id);
                                        setEditedText(item.text);
                                    }}
                                    className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
                                    title="Edit Task"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={() => handleDeleteTask(item.id)}
                                className="text-red-600 cursor-pointer hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                title="Delete Task"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
