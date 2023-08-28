import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { useUserStore } from "./zustand/userStore";

type AppProps = {};

const App: React.FC<AppProps> = () => {
	const user = useUserStore((state) => state.user);

	return (
		<div>
			<BrowserRouter>
				<ToastContainer />
				<Navbar />
				<Routes>
					{user ? (
						<>
							<Route path="*" element={<Navigate to="/tasks" />} />
							<Route path="/tasks" element={<Tasks />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</>
					) : (
						<>
							<Route path="*" element={<Navigate to="/login" />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</>
					)}
				</Routes>
			</BrowserRouter>
		</div>
	);
};
export default App;
