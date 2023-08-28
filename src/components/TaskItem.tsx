import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditModal from "./EditModal";

type TaskItemProps = {
	task: {
		_id: string;
		title: string;
		description: string;
		completed: boolean;
	};
	fetchTasks: () => void;
};

interface ApiResponse {
	error?: string;
	message?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
	task: { _id, title, description, completed },
	fetchTasks,
}) => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleDelete = async (id: string) => {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				navigate("/login");
				return toast.error("Authentication token not found", {
					position: "top-center",
					autoClose: 3000,
				});
			}

			const response = await axios.delete(
				`https://task-app-backend-rust.vercel.app/api/tasks/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 204) {
				toast.success("Task deleted successfully", {
					position: "top-center",
					autoClose: 3000,
				});

				fetchTasks();
			}
		} catch (e) {
			const error = e as AxiosError;

			if (error.response) {
				const responseData = error.response.data as ApiResponse;
				toast.error(responseData.error, {
					position: "top-center",
					autoClose: 3000,
				});
			} else {
				toast.error("An error occurred. Please try again later.", {
					position: "top-center",
					autoClose: 3000,
				});
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={`rounded-lg p-4 shadow ${
				completed ? "bg-green-200" : "bg-red-200"
			}`}
		>
			<div className="flex justify-between">
				<h1 className="text-xl font-medium mb-2">{title}</h1>
				<div className="flex gap-2 items-center">
					<EditModal
						task={{
							id: _id,
							title,
							description,
							completed,
						}}
						fetchTasks={fetchTasks}
					/>

					<button onClick={() => handleDelete(_id)}>
						{loading ? (
							<ImSpinner8 className="w-6 h-6 animate-spin" />
						) : (
							<RiDeleteBin6Line className="w-6 h-6 text-red-600" />
						)}
					</button>
				</div>
			</div>
			<h2 className="text-base text-gray-600">{description}</h2>

			<h2
				className={`mt-3 font-medium ${
					completed ? "text-green-500" : "text-red-500"
				}`}
			>
				{completed ? "Completed" : "Incomplete"}
			</h2>
		</div>
	);
};
export default TaskItem;
