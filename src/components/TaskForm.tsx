import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ApiResponse {
	task?: Object;
	error?: String;
}

type TaskFormProps = {
	onTaskCreated: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
	const [inputs, setInputs] = useState({ title: "", description: "" });
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.title || !inputs.description) {
			return toast.error("Please fill all fields", {
				position: "top-center",
				autoClose: 3000,
			});
		}

		setLoading(true);

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				navigate("/login");
				return toast.error("Authentication token not found", {
					position: "top-center",
					autoClose: 3000,
				});
			}

			const response = await axios.post(
				"https://task-app-backend-rust.vercel.app/api/tasks",
				inputs,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 201) {
				toast.success("Task created successfully", {
					position: "top-center",
					autoClose: 3000,
				});
				setInputs({ title: "", description: "" });
				onTaskCreated();
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
		<div className="p-8 bg-gray-100 rounded-lg mx-44">
			<form
				className="flex flex-col gap-4 justify-center"
				onSubmit={handleCreate}
			>
				<input
					type="text"
					name="title"
					className="p-2 rounded-lg"
					placeholder="Title"
					onChange={handleInputChange}
					value={inputs.title}
				/>
				<input
					type="text"
					name="description"
					className="p-2 rounded-lg"
					placeholder="Description"
					onChange={handleInputChange}
					value={inputs.description}
				/>
				<button className="px-4 py-2 rounded-lg bg-green-400 w-1/2 mx-auto mt-4 inline-flex justify-center">
					{loading ? <ImSpinner8 className="w-6 h-6 animate-spin" /> : "Create"}
				</button>
			</form>
		</div>
	);
};
export default TaskForm;
