import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "../zustand/userStore";

const Tasks: React.FC = () => {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);

	// Function to fetch tasks
	const fetchTasks = async () => {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				navigate("/login");
				return toast.error("Authentication token not found", {
					position: "top-center",
					autoClose: 3000,
				});
			}

			const response = await axios.get(
				"https://task-app-backend-rust.vercel.app/api/tasks",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				setTasks(response.data);
			}
		} catch (e) {
			const error = e as AxiosError<{ error: { name: string } }>;
			if (error.response?.data?.error?.name) {
				const errorName = error.response.data.error.name;

				if (
					typeof errorName === "string" &&
					errorName.startsWith("TokenExpiredError")
				) {
					useUserStore.getState().logout();
					navigate("/login");

					return toast.error("Login Session has Expired", {
						position: "top-center",
						autoClose: 3000,
					});
				}
			} else {
				toast.error("An error occurred. Please try again later.", {
					position: "top-center",
					autoClose: 3000,
				});
			}
		}
	};

	useEffect(() => {
		// Fetch tasks when the component mounts
		fetchTasks();
	}, []);

	const fetchTasksAgain = async () => {
		await fetchTasks();
	};

	return (
		<>
			<div className="p-8">
				<TaskForm onTaskCreated={fetchTasksAgain} />
				<div className="p-6 rounded-lg bg-gray-100 mt-10 grid grid-cols-4 gap-3">
					{tasks.map((item, index) => (
						<div key={index} className="col-span-1">
							<TaskItem task={item} fetchTasks={fetchTasksAgain} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Tasks;
