import axios, { AxiosError } from "axios";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type EditModalProps = {
	task: {
		id: string;
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

const EditModal: React.FC<EditModalProps> = ({
	task: { id, title, description, completed },
	fetchTasks,
}) => {
	const [openModal, setOpenModal] = useState<string | undefined>();
	const props = { openModal, setOpenModal };
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		title: title,
		description: description,
		completed: completed,
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		setInputs((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
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

			await axios.put(
				`https://task-app-backend-rust.vercel.app/api/tasks/${id}`,
				inputs,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast.success("Task edited successfully", {
				position: "top-center",
				autoClose: 3000,
			});
			fetchTasks();
			props.setOpenModal(undefined);
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
		<>
			<button onClick={() => props.setOpenModal("dismissible")}>
				<BiEdit className="w-6 h-6 text-gray-600" />
			</button>
			<Modal
				dismissible
				show={props.openModal === "dismissible"}
				onClose={() => props.setOpenModal(undefined)}
			>
				<Modal.Header>Edit Task</Modal.Header>
				<Modal.Body>
					<form
						className="flex flex-col gap-4 justify-center"
						onSubmit={handleEdit}
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
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="completed"
								className="p-2 rounded"
								onChange={handleInputChange}
								checked={inputs.completed}
								id="completed"
							/>
							<label htmlFor="completed">
								{completed ? "Mark as Incomplete" : "Mark as Completed"}
							</label>
						</div>

						<button className="px-4 py-2 rounded-lg bg-green-400 w-1/2 mx-auto mt-4 inline-flex justify-center">
							{loading ? (
								<ImSpinner8 className="w-6 h-6 animate-spin" />
							) : (
								"Save Changes"
							)}
						</button>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default EditModal;
