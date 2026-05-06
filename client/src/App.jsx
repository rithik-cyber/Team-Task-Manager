import { useState } from "react";
import axios from "axios";

function App() {

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [projects, setProjects] = useState([]);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("High");

  const [tasks, setTasks] = useState([
    {
      title: "Build Backend APIs",
      description: "Create authentication and task APIs using Express and MongoDB.",
      priority: "High",
      status: "In Progress"
    },
    {
      title: "Design Dashboard UI",
      description: "Build responsive frontend using React and Tailwind CSS.",
      priority: "Medium",
      status: "Completed"
    }
  ]);

  const createProject = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/projects",

        {
          name: projectName,
          description: projectDescription
        },

        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjczYjU4MGVjMDcxYzE1Yzk3MGQ4NCIsImlhdCI6MTc3ODA1MjY4NSwiZXhwIjoxNzc4NjU3NDg1fQ.8wCGdpJRzweUF4mS_JAbqgO30DgcR_xB44ijKKbfi0o"
          }
        }
      );

      const newProject = {
        name: projectName,
        description: projectDescription
      };

      setProjects([...projects, newProject]);

      setProjectName("");
      setProjectDescription("");

      alert("Project Created Successfully");

      console.log(response.data);

    } catch (error) {

      console.log(error);

      alert("Error creating project");

    }

  };

  const createTask = () => {

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      status: "Pending"
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("High");

    alert("Task Created Successfully");

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Team Task Manager
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-5 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold text-blue-600">
            {tasks.length}
          </h2>
          <p>Total Tasks</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold text-green-600">
            5
          </h2>
          <p>Completed</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold text-yellow-600">
            4
          </h2>
          <p>In Progress</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600">
            3
          </h2>
          <p>Pending</p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-2xl font-semibold mb-4">
            Create Project
          </h2>

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) =>
              setProjectDescription(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <button
            onClick={createProject}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Create Project
          </button>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-2xl font-semibold mb-4">
            Create Task
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) =>
              setTaskDescription(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <select
            value={taskPriority}
            onChange={(e) =>
              setTaskPriority(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={createTask}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Create Task
          </button>

        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Project List
        </h2>

        {projects.map((project, index) => (

          <div
            key={index}
            className="border p-4 rounded mb-4"
          >

            <h3 className="font-bold text-lg">
              {project.name}
            </h3>

            <p className="text-gray-600 mt-2">
              {project.description}
            </p>

          </div>

        ))}

      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Task List
        </h2>

        {tasks.map((task, index) => (

          <div
            key={index}
            className="border p-4 rounded mb-4"
          >

            <div className="flex justify-between items-center">

              <h3 className="font-bold text-lg">
                {task.title}
              </h3>

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {task.priority}
              </span>

            </div>

            <p className="text-gray-600 mt-2">
              {task.description}
            </p>

            <p className="text-sm text-blue-600 mt-2">
              Status: {task.status}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default App;