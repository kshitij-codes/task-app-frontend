import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { useUserStore } from "./zustand/userStore";

const App: React.FC = () => {
	const user = useUserStore((state) => state.user);

	// Define a private route component that redirects to the login page if the user is not logged in
	const PrivateRoute: React.FC<{ path: string; element: JSX.Element }> = ({
		path,
		element,
	}) => {
		if (user) {
			return <Route path={path} element={element} />;
		} else {
			return <Navigate to="/login" />;
		}
	};

	return (
		<div>
			<BrowserRouter>
				<ToastContainer />
				<Navbar />
				<Routes>
					{/* Public routes */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Private routes */}
					<PrivateRoute path="/tasks" element={<Tasks />} />

					{/* Redirect to default route when no routes match */}
					<Route path="*" element={<Navigate to="/tasks" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
