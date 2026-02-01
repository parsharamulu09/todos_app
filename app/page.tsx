"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (id: number, title: string) => {
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  const saveEdit = async (id: number) => {
    if (!editText.trim()) return;

    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: editText }),
    });

    setEditingId(null);
    setEditText("");
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">✨ Animated Todo</h1>

        {/* Add Todo */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 p-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="Add a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="bg-purple-600 text-white px-4 rounded-xl hover:scale-105 active:scale-95 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 80 }}
                className={`p-3 rounded-xl shadow-md ${
                  todo.completed
                    ? "bg-green-100 line-through text-gray-500"
                    : "bg-gray-100"
                }`}
              >
                {editingId === todo.id ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <input
                      className="flex-1 p-2 rounded border"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="text-green-600 font-bold"
                    >
                      Save
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span
                      onClick={() => toggleTodo(todo.id, todo.title)}
                      className="cursor-pointer flex-1"
                    >
                      {todo.title}
                    </span>

                    <div className="flex gap-3 ml-3">
                      <button
                        onClick={() => {
                          setEditingId(todo.id);
                          setEditText(todo.title);
                        }}
                        className="text-blue-500 hover:scale-110 transition"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:scale-110 transition"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
