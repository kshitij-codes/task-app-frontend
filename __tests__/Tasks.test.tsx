import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "../src/pages/Tasks";
import React from "react";

test("renders without crashing", () => {
	render(
		<Router>
			<Tasks />
		</Router>
	);
});

test("redirects to login when there is no token", async () => {
	window.localStorage.setItem("token", ""); // Ensure there's no token
	render(
		<Router>
			<Routes>
				<Route path="/tasks" element={<Tasks />} />
				<Route path="/login" element={<div>Login</div>} />
			</Routes>
		</Router>
	);

	// Wait for any asynchronous actions to complete
	// You might need to adjust this depending on how your component works
	await new Promise((resolve) => setTimeout(resolve, 0));

	expect(screen.getByText("Login")).toBeInTheDocument();
});
