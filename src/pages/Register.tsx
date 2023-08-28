import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ApiResponse {
	error?: string;
	message?: string;
}

const Register: React.FC = () => {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		fullname: "",
		username: "",
		password: "",
		email: "",
	});
	const [warning, setWarning] = useState("");
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (inputs.username.length < 5 || inputs.password.length < 5) {
			setWarning("Username and Password should be of at least 6 characters");
		} else {
			setWarning("");
		}

		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputs.username.length < 6 || inputs.password.length < 6) {
			return toast.error("Please fill all fields", {
				position: "top-center",
				autoClose: 3000,
			});
		}

		setLoading(true);

		try {
			const response = await axios.post(
				"https://task-app-backend-rust.vercel.app/api/user/register",
				inputs
			);
			toast.success(`${response.data.message}. Please Login`, {
				position: "top-center",
				autoClose: 3000,
			});
			setInputs({
				fullname: "",
				username: "",
				password: "",
				email: "",
			});
			navigate("/login");
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
		<div>
			<div className="bg-gray-200 rounded-lg p-4 w-1/2 mx-auto my-10">
				<form onSubmit={handleRegister} className="flex flex-col gap-4">
					<input
						className="p-2 rounded-lg"
						type="text"
						name="fullname"
						onChange={handleInputChange}
						placeholder="Full Name"
					/>
					<input
						className="p-2 rounded-lg"
						type="email"
						name="email"
						onChange={handleInputChange}
						placeholder="Email ID"
					/>
					<input
						className="p-2 rounded-lg"
						type="text"
						name="username"
						onChange={handleInputChange}
						placeholder="Username"
					/>
					<input
						className="p-2 rounded-lg"
						placeholder="Password"
						type="password"
						name="password"
						onChange={handleInputChange}
					/>
					{warning !== "" && <h2 className="text-red-500 my-2">{warning}</h2>}

					<button className="bg-green-400 rounded-lg px-4 py-2 flex justify-center">
						{loading ? (
							<ImSpinner8 className="w-6 h-6 animate-spin" />
						) : (
							"Sign Up"
						)}
					</button>
				</form>
				<h1 className="text-base mt-4">
					Already have an account?{" "}
					<Link className="text-blue-500" to={"/login"}>
						Login
					</Link>
				</h1>
			</div>
		</div>
	);
};
export default Register;
