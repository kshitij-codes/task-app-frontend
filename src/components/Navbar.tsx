import React from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../zustand/userStore";

const Navbar: React.FC = () => {
	const { user, logout } = useUserStore();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();

		localStorage.removeItem("user");
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div className="w-full bg-gray-800 py-3 px-14 flex justify-between text-white items-center">
			<Link to="/tasks">
				<h1 className="font-medium text-lg">Task Managament App</h1>
			</Link>
			<div className="flex gap-6 items-center">
				{user && (
					<>
						<h2 className="font-medium">Welcome, {user.username}</h2>
						<button
							onClick={handleLogout}
							className="px-4 py-2 flex gap-2 bg-gray-200 rounded-lg text-gray-800 font-medium"
						>
							<CiLogout className="w-6 h-6" />
							Logout
						</button>
					</>
				)}
			</div>
		</div>
	);
};
export default Navbar;
